import { envConfig } from '../utils/dotenv.config.js';
import { WebSocket, WebSocketServer } from 'ws';
import { setupHeartbeat } from '../webSocket/setupHeartbeat.js';
import { setupWebSocketLifecycle } from '../webSocket/setupWebSocketLifecycle.js';
import { handleClientHandshake } from '../webSocket/handleClientHandshake.js';
import {
  printMessage,
  printError,
  printInfo,
  printWarning,
} from '../utils/logger.js';
import { testSendInitData } from './testSendInitData.js';
import { getTestLatestSession } from './testData.js';
import { fetchMeeting } from '../webSocket/openF1Api.js';
import { getTestLatestMeeting } from './testData.js';
import { updateStints } from '../data/stints.js';
import { getTestLatestStints } from './testData.js';
import { getTestLatestTeamRadio } from './testData.js';
import { fetchDriverData } from '../data/driverData.js';
import { updateInterval } from '../data/intervals.js';
import { updatePositionsData } from '../data/positions.js';
import { testMergePositionWithIntervals } from './testMergeData.js';
import {
  groupDriversByInterval,
  setLatestGroupedIntervals,
} from '../data/groupIntervals.js';
import {
  broadcastAllToClient,
  broadcastToClient,
} from '../webSocket/broadcast.js';
import {
  getScheduleByLocation,
  initScheduleWatcher,
} from '../data/schedule.js';
import {
  simulateIntervalChange,
  simulateStintChange,
  simulateTeamRadioUpdates,
} from './testSimulator.js';

const PORT = envConfig.PORT;
let previousMeetingKey = null;

export function createTestWebSocketServer(server, interval = 10000) {
  const wss = new WebSocketServer({ server });
  printInfo('🩻 TEST: F1-LiveUpdater WebSocket server created');
  setupWebSocketServer(wss);

  // Simulate Test Data
  simulateIntervalChange(wss);
  simulateStintChange(wss);
  // simulateTeamRadioUpdates(wss);

  startDataUpdater(wss, interval);
  printInfo(
    `🩻 TEST: F1-LiveUpdater WebSocket server is running on ws://localhost:${PORT}`
  );
}

function setupWebSocketServer(wss) {
  wss.on('connection', (ws) => {
    printMessage('🔗 Client connected');
    handleClientHandshake(ws);
    setupWebSocketLifecycle(ws);
    testSendInitData(ws);
  });

  setupHeartbeat(wss);
}

function startDataUpdater(wss, interval) {
  initScheduleWatcher();

  setInterval(async () => {
    const session = getTestLatestSession();

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
      meeting = getTestLatestMeeting();
    }

    // Always update live data
    await updateStints();
    const currentSchedule = getScheduleByLocation(session.location);
    const stints = getTestLatestStints();
    const teamRadio = getTestLatestTeamRadio();
    const { intervals, positions, error } = await fetchDriverData();

    if (error) {
      printError('Fetch error:', error);
      return;
    }

    // if (!Array.isArray(intervals)) {
    //   handleEmptyIntervals(
    //     wss,
    //     positions,
    //     session,
    //     stints,
    //     teamRadio,
    //     meeting,
    //     currentSchedule
    //   );
    //   return;
    // }

    updateInterval(intervals);
    updatePositionsData(positions);

    const mergedPositionsAndIntervals = testMergePositionWithIntervals();
    const groupedIntervals = groupDriversByInterval(
      mergedPositionsAndIntervals
    );

    setLatestGroupedIntervals(groupedIntervals);

    if (isMergedDataStale(session, mergedPositionsAndIntervals)) {
      printWarning('🙅‍♂️ No new session data available yet.');
      return;
    }

    broadcastToClient(
      wss,
      mergedPositionsAndIntervals,
      groupedIntervals,
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
  printWarning('TEST: F1-LiveUpdater returned empty intervals.');

  // Clear grouped cache
  setLatestGroupedIntervals([]);
  // Still update positions
  updatePositionsData(positions);

  const mergedPositionsAndIntervals = testMergePositionWithIntervals();
  const sortedMerged = mergedPositionsAndIntervals
    .slice()
    .sort((a, b) => a.position - b.position);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      broadcastAllToClient(client, {
        mergedPositionsAndIntervals,
        sortedMerged,
        grouped: [],
        session,
        stints,
        teamRadio,
        meeting,
        currentSchedule,
      });
    }
  });
}
