import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import { fetchIntervals, fetchPositions } from './openf1Api.js';
import { updateIntervalSnapshot } from '../data/intervals.js';
import { updatePositionsData, getLatestPositions } from '../data/positions.js';
import { getLatestSession } from '../data/sessions.js';
import { mergePositionWithIntervals } from '../data/mergeDriverData.js';
import { groupDriversByInterval } from '../data/groupIntervals.js';
import {
  setLatestGroupedIntervals,
  getLatestGroupedIntervals,
} from '../data/groupedIntervalsStore.js';
import { tryCatchSync } from '../utils/tryCatch.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

export function createWebSocketServer(server, interval = 4000) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, PORT);

  startDataUpdater(wss, interval);

  console.log('🏃 WebSocket server is running...');
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

    // Send the latest grouped intervals if available
    const latestIntervals = getLatestGroupedIntervals();
    if (latestIntervals.length > 0) {
      sendData(ws, 'grouped_intervals', latestIntervals);
      // ws.send(
      //   JSON.stringify({
      //     type: 'grouped_intervals',
      //     data: latestIntervals,
      //   })
      // );
    }

    // Send latest positions if available
    const latestPositions = getLatestPositions();
    if (latestPositions.length > 0) {
      sendData(ws, 'positions_update', latestPositions);
      // ws.send(
      //   JSON.stringify({
      //     type: 'positions_update',
      //     data: latestPositions,
      //   })
      // );
    }

    // Send session info if available
    const session = getLatestSession();
    if (session) {
      sendData(ws, 'session', session);
      // ws.send(
      //   JSON.stringify({
      //     type: 'session',
      //     data: session,
      //   })
      // );
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

  console.log(`🛜  WebSocket Server is running on ws://localhost:${port}`);
}

function startDataUpdater(wss, interval) {
  setInterval(async () => {
    // Fetch session
    const session = getLatestSession();
    const now = new Date();

    if (!session || new Date(session.date_end) < now) {
      console.warn('No active session - skipping data fetch');
      return;
    }

    // Fetch data
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

    broadcastToClient(wss, merged, grouped, session);
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

      // client.send(
      //   JSON.stringify({
      //     type: 'grouped_intervals',
      //     data: [],
      //   })
      // );

      // client.send(
      //   JSON.stringify({
      //     type: 'positions_update',
      //     data: merged.sort((a, b) => a.position - b.position),
      //   })
      // );

      // client.send(
      //   JSON.stringify({
      //     type: 'session',
      //     data: session,
      //   })
      // );
    }
  });
}

function broadcastToClient(wss, merged, grouped, session) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      sendData(client, 'grouped_intervals', grouped);
      sendData(
        client,
        'positions_update',
        merged.sort((a, b) => a.position - b.position)
      );
      sendData(client, 'session', session);

      // client.send(
      //   JSON.stringify({
      //     type: 'grouped_intervals',
      //     data: grouped,
      //   })
      // );

      // client.send(
      //   JSON.stringify({
      //     type: 'positions_update',
      //     data: merged.sort((a, b) => a.position - b.position),
      //   })
      // );

      // client.send(
      //   JSON.stringify({
      //     type: 'session',
      //     data: session,
      //   })
      // );
    }
  });
}

function sendData(ws, type, data) {
  ws.send(
    JSON.stringify({
      type,
      data,
    })
  );
}
