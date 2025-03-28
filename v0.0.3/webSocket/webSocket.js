import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import { fetchIntervals, fetchPositions } from './openf1Api.js';
import { updateIntervalSnapshot } from '../data/intervals.js';
import { updatePositionsData, getLatestPositions } from '../data/positions.js';
import { getLatestSession } from '../data/sessions.js';
import { getLatestStints, updateStints } from '../data/stints.js';
import { mergePositionWithIntervals } from '../data/mergeDriverData.js';
import { groupDriversByInterval } from '../data/groupIntervals.js';
import {
  setLatestGroupedIntervals,
  getLatestGroupedIntervals,
} from '../data/groupedIntervalsStore.js';
import { sendData } from '../utils/sendData.js';
import { tryCatchSync } from '../utils/tryCatch.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export function createWebSocketServer(server, interval = 4000) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, PORT);

  startDataUpdater(wss, interval);

  console.info('🏃 WebSocket server is running...');
}

function setupWebSocketServer(wss, port) {
  wss.on('connection', (ws) => {
    console.log('🔗 Client connected');

    // Track if the client is alive
    ws.isAlive = true;

    // Listen for pong to confirm client is still response
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    // Initial welcome message
    ws.send(
      JSON.stringify({
        message: '🔗 Connected to OpenF1 WebSocket Server',
      })
    );

    const session = getLatestSession();
    const latestIntervals = getLatestGroupedIntervals();
    const latestPositions = getLatestPositions();
    const stints = getLatestStints();

    const currentSessionKey = session?.session_key;
    const intervalSessionKey = latestIntervals?.session_key;
    const positionSessionKey = latestPositions?.session_key;
    const isSessionEnded =
      currentSessionKey !== intervalSessionKey ||
      currentSessionKey !== positionSessionKey;

    // Send session info if available
    if (session) {
      sendData(ws, 'session', session);
    }

    // Send the latest grouped intervals if available
    if (latestIntervals.length > 0 && !isSessionEnded) {
      sendData(ws, 'grouped_intervals', latestIntervals);
    }

    // Send latest positions if available
    if (latestPositions.length > 0 && !isSessionEnded) {
      sendData(ws, 'positions_update', latestPositions);
    }

    // Send stints info if available
    if (stints.length > 0 && !isSessionEnded) {
      sendData(ws, 'stints', stints);
    }

    // Close the connection when the client disconnects
    ws.on('close', () => {
      console.log('❌ Client disconnected');
    });

    // Error handling for WebSocket client
    ws.on('error', (err) => {
      console.error('❌ WebSocket client error:', err.message);
    });
  });

  // Heartbeat: Ping clients every 30 seconds
  const pingInterval = setInterval(() => {
    console.log(`👨‍👩‍👧‍👦 Active clients: ${wss.clients.size}`);

    wss.clients.forEach((client) => {
      if (client.isAlive === false) {
        console.error('⛔ No pong - terminating stale client');
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(pingInterval);
  });

  console.log(`🛜 WebSocket Server is running on ws://localhost:${port}`);
}

function startDataUpdater(wss, interval) {
  setInterval(async () => {
    // Fetch session
    const session = getLatestSession();
    const now = new Date();

    // If no new session detected, stop here.
    if (!session || new Date(session.date_end) < now) {
      console.warn('No active session - skipping data fetch');
      return;
    }

    // Get the latest stints
    await updateStints();
    const stints = getLatestStints();

    // Fetch intervals and positions data
    const [intervals, intervalError] = await tryCatchSync(fetchIntervals());
    const [positions, positionsError] = await tryCatchSync(fetchPositions());

    // If there are any errors, return
    if (intervalError || positionsError) {
      console.error('Fetch error:', {
        intervals: intervalError?.message,
        positions: positionsError?.message,
      });

      return;
    }

    // Check for empty interval data
    // During the practices and qualifying,
    // fetched intervals will be empty
    // but the positions will be available.
    if (!Array.isArray(intervals) || intervals.length === 0) {
      handleEmptyIntervals(wss, positions, session);
      return;
    }

    // Update latest interval and position data
    updateIntervalSnapshot(intervals);
    updatePositionsData(positions);

    // Merge interval and position data
    const merged = mergePositionWithIntervals();

    // Group drivers by intervals that are within 3 seconds
    const grouped = groupDriversByInterval(merged);

    setLatestGroupedIntervals(grouped);

    // Display intervals and positions
    // only if the current session key and grouped session key
    // is same.
    // Otherwise, do not display them because it is from previous race.
    if (session.session_key !== merged.at(0).session_key) {
      console.warn('No new session data available yet.');
      return;
    }

    broadcastToClient(wss, merged, grouped, session, stints);
  }, interval);
}

function handleEmptyIntervals(wss, positions, session) {
  console.warn('OpenF1 returned empty intervals.');

  // Clear grouped cache
  setLatestGroupedIntervals([]);
  // Still update positions
  updatePositionsData(positions);

  const merged = mergePositionWithIntervals();

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      sendData(client, 'grouped_intervals', []);
      sendData(
        client,
        'positions_update',
        merged.sort((a, b) => a.position - b.position)
      );
      sendData(client, 'session', session);
    }
  });
}

function broadcastToClient(wss, merged, grouped, session, stints) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      sendData(client, 'grouped_intervals', grouped);
      sendData(
        client,
        'positions_update',
        merged.sort((a, b) => a.position - b.position)
      );
      sendData(client, 'session', session);
      sendData(client, 'stints', stints);
    }
  });
}
