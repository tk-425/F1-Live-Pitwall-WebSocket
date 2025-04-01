import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import { updateIntervalSnapshot } from '../data/intervals.js';
import { updatePositionsData } from '../data/positions.js';
import { getLatestSession } from '../data/sessions.js';
import { getLatestStints, updateStints } from '../data/stints.js';
import { mergePositionWithIntervals } from '../data/mergeDriverData.js';
import { groupDriversByInterval } from '../data/groupIntervals.js';
import { setLatestGroupedIntervals } from '../data/groupedIntervalsStore.js';
import { broadcastToClient, broadcastAllToClient } from '../utils/broadcast.js';
import { sendInitData } from '../utils/sendInitData.js';
import { setupWebSocketLifecycle } from '../utils/setupWebSocketLifecycle.js';
import { setupHeartbeat } from '../utils/setupHeartbeat.js';
import { handleClientHandshake } from '../utils/handleClientHandshake.js';
import { fetchDriverData } from '../utils/fetchDriverData.js';
import { envPath } from '../utils/envPath.js';

dotenv.config(envPath);

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
    handleClientHandshake(ws);
    setupWebSocketLifecycle(ws);
    sendInitData(ws);
  });

  setupHeartbeat(wss);
  console.log(`🛜 WebSocket Server is running on ws://localhost:${port}`);
}

function startDataUpdater(wss, interval) {
  setInterval(async () => {
    // Fetch session
    const session = getLatestSession();

    // If no new session detected, stop here.
    if (isSessionExpired(session)) {
      console.warn('No active session - skipping data fetch');
      return;
    }

    // Get the latest stints
    await updateStints();
    const stints = getLatestStints();

    // // Fetch intervals and positions data
    const { intervals, positions, error } = await fetchDriverData();

    if (error) {
      console.error('Fetch error:', error);
      return;
    }

    // Check for empty interval data
    // During the practices and qualifying,
    // fetched intervals will be empty
    // but the positions will be available.
    if (!Array.isArray(intervals) || intervals.length === 0) {
      handleEmptyIntervals(wss, positions, session, stints);
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

    // Display intervals and positions only if the current session key
    // and grouped session key is same.
    // Otherwise, do not display them because it is from previous race.
    if (isMergedDataStale(session, merged)) {
      console.warn('No new session data available yet.');
      return;
    }

    broadcastToClient(wss, merged, grouped, session, stints);
  }, interval);
}

function isSessionExpired(session) {
  return !session || new Date(session.date_end) < new Date();
}

function isMergedDataStale(session, merged) {
  if (!Array.isArray(merged) || merged.length === 0) {
    return true;
  }

  const first = merged[0];

  return session.session_key !== first?.session_key;
}

function handleEmptyIntervals(wss, positions, session, stints) {
  console.warn('OpenF1 returned empty intervals.');

  // Clear grouped cache
  setLatestGroupedIntervals([]);
  // Still update positions
  updatePositionsData(positions);

  const merged = mergePositionWithIntervals();
  const sortedMerged = merged.slice().sort((a, b) => a.position - b.position);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      broadcastAllToClient(client, {
        grouped: [],
        merged: sortedMerged,
        session,
        stints,
      });
    }
  });
}
