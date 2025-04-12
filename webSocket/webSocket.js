import { envConfig } from '../utils/dotenv.config.js';
import { WebSocket, WebSocketServer } from 'ws';
import { setupHeartbeat } from './setupHeartbeat.js';
import { setupWebSocketLifecycle } from './setupWebSocketLifecycle.js';
import { handleClientHandshake } from './handleClientHandshake.js';
import {
  printMessage,
  printError,
  printInfo,
  printWarning,
} from '../utils/logger.js';
import { sendInitData } from '../data/sendInitData.js';
import { getLatestSession } from '../data/session.js';
import { fetchMeeting } from './openF1Api.js';
import { getLatestMeeting } from '../data/meeting.js';
import { getLatestStints, updateStints } from '../data/stints.js';
import { getLatestTeamRadio } from '../data/teamRadio.js';
import { fetchDriverData } from '../data/driverData.js';
import { updateInterval } from '../data/intervals.js';
import { updatePositionsData } from '../data/positions.js';
import { mergePositionWithIntervals } from '../data/mergeDriverData.js';
import {
  groupDriversByInterval,
  setLatestGroupedIntervals,
} from '../data/groupIntervals.js';
import { broadcastAllToClient, broadcastToClient } from './broadcast.js';
import {
  getScheduleByLocation,
  initScheduleWatcher,
} from '../data/schedule.js';

const PORT = envConfig.PORT;
let previousMeetingKey = null;

export function createWebSocketServer(server, interval = 4000) {
  const wss = new WebSocketServer({ server });
  printInfo('😀 F1-LiveUpdater WebSocket server created');
  setupWebSocketServer(wss);
  startDataUpdater(wss, interval);
  printInfo(
    `🛜 F1-LiveUpdater WebSocket server is running on ws://localhost:${PORT}`
  );
}

function setupWebSocketServer(wss) {
  wss.on('connection', (ws) => {
    printMessage('🔗 Client connected');
    handleClientHandshake(ws);
    setupWebSocketLifecycle(ws);
    sendInitData(ws);
  });

  setupHeartbeat(wss);
}

function startDataUpdater(wss, interval) {
  initScheduleWatcher();

  setInterval(async () => {
    const session = getLatestSession();

    if (isSessionExpired(session)) {
      printWarning('🙅‍♂️ No active session - skipping data fetch');
      return;
    }

    // Only fetch new meeting if session's meeting_key has changed
    let meeting = null;
    const currentMeetingKey = session.meeting_key;

    if (currentMeetingKey !== previousMeetingKey) {
      meeting = await fetchMeeting();
      previousMeetingKey = currentMeetingKey;
    } else {
      meeting = getLatestMeeting();
    }

    // Always update live data
    await updateStints();
    const currentSchedule = getScheduleByLocation(session.location);
    const stints = getLatestStints();
    const teamRadio = getLatestTeamRadio();
    const { intervals, positions, error } = await fetchDriverData();

    if (error) {
      printError('Fetch error:', error);
      return;
    }

    if (!Array.isArray(intervals) || intervals.length === 0) {
      handleEmptyIntervals(
        wss,
        positions,
        session,
        stints,
        teamRadio,
        meeting,
        currentSchedule
      );
      return;
    }

    updateInterval(intervals);
    updatePositionsData(positions);

    const merged = mergePositionWithIntervals();
    const grouped = groupDriversByInterval(merged);

    setLatestGroupedIntervals(grouped);

    if (isMergedDataStale(session, merged)) {
      printWarning('🙅‍♂️ No new session data available yet.');
      return;
    }

    broadcastToClient(
      wss,
      merged,
      grouped,
      session,
      stints,
      teamRadio,
      meeting,
      currentSchedule
    );
  }, interval);
}

function isSessionExpired(session) {
  if (!session) {
    printWarning('🚫 No session object found.');
    return true;
  }

  const now = new Date();
  const originalEnd = session.date_end ? new Date(session.date_end) : null;

  if (!originalEnd || isNaN(originalEnd)) {
    printWarning(
      '⚠️ session.date_end is missing or invalid. Assuming session is active.'
    );
    return false;
  }

  // 1 hour buffer for session delay (e.g. red flag, weather, etc.)
  const BUFFER_MS = 60 * 60 * 1000;
  const adjustedEnd = new Date(originalEnd.getTime() + BUFFER_MS);

  return adjustedEnd < now;
}

export function isMergedDataStale(session, merged) {
  if (!Array.isArray(merged) || merged.length === 0) {
    return true;
  }

  const first = merged[0];

  return session?.session_key !== first?.session_key;
}

function handleEmptyIntervals(
  wss,
  positions,
  session,
  stints,
  teamRadio,
  meeting,
  currentSchedule
) {
  printWarning('F1-LiveUpdater returned empty intervals.');

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
        teamRadio,
        meeting,
        currentSchedule,
      });
    }
  });
}
