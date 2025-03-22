import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { fetchIntervals, fetchPositions } from './openf1Api.js';
import { updateIntervalSnapshot, getLatestIntervals } from '../data/intervals.js';
import { updatePositionsData, getLatestPositions } from '../data/positions.js';
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

  console.log('WebSocket server is running...');
}

function setupWebSocketServer(wss , port) {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Track if the client is alive
    ws.isAlive = true;

    // Listen for pong to confirm client is still response
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    // Initial welcome message
    ws.send(
      JSON.stringify({
        message: 'Connected to OpenF1 WebSocket Server',
      })
    );

    // Send the latest grouped intervals if available
    const latestIntervals = getLatestGroupedIntervals();
    if (latestIntervals.length > 0) {
      ws.send(
        JSON.stringify({
          type: 'grouped_intervals',
          data: latestIntervals,
        })
      );
    }

    // Send latest positions if available
    const latestPositions = getLatestPositions();
    if (latestPositions.length > 0) {
      ws.send(
        JSON.stringify({
          type: 'positions_update',
          data: latestPositions,
        })
      );
    }

    // Close the connection when the client disconnects
    ws.on('close', () => {
      console.log('Client disconnected');
    });

    // Error handling for WebSocket client
    ws.on('error', (err) => {
      console.error('WebSocket client error:', err.message);
    });
  });

  // Heartbeat: Ping clients every 30 seconds
  const pingInterval = setInterval(() => {
    console.log(`Active clients: ${wss.clients.size}`);

    wss.clients.forEach((client) => {
      if (client.isAlive === false) {
        console.error('No pong - terminating stale client');
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(pingInterval);
  });

  console.log(`WebSocket Server is running on ws://localhost:${port}`);
}

function startDataUpdater(wss, interval) {
  setInterval(async () => {
    const [intervals, intervalError] = await tryCatchSync(fetchIntervals());
    const [positions, positionsError] = await tryCatchSync(fetchPositions());

    if (intervalError || positionsError) {
      console.error('Fetch error:', {
        intervals: intervalError?.message,
        positions: positionsError?.message,
      });

      return;
    }

    updateIntervalSnapshot(intervals);
    updatePositionsData(positions);

    const merged = mergePositionWithIntervals();
    const grouped = groupDriversByInterval(merged);

    setLatestGroupedIntervals(grouped);

    broadcastToClient(wss, merged, grouped);
  }, interval);
}

function broadcastToClient(wss, merged, grouped) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(
        JSON.stringify({
          type: 'grouped_intervals',
          data: grouped,
        })
      );

      client.send(
        JSON.stringify({
          type: 'positions_update',
          data: merged.sort((a, b) => a.position - b.position),
        })
      );
    }
  });
}
