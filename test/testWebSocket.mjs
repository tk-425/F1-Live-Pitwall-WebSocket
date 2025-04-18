import dotenv from 'dotenv';
dotenv.config();
import { WebSocketServer } from 'ws';
import { setupHeartbeat } from '../webSocket/setupHeartbeat.mjs';
import { setupWebSocketLifecycle } from '../webSocket/setupWebSocketLifecycle.mjs';
import { handleClientHandshake } from '../webSocket/handleClientHandshake.mjs';
import {
  printMessage,
  printError,
  printInfo,
  printWarning,
} from '../utils/logger.mjs';
import { testSendInitData } from './testSendInitData.mjs';
import { getTestLatestSession } from './testData.mjs';
import { fetchMeeting } from '../webSocket/openF1Api.mjs';
import { getTestLatestMeeting } from './testData.mjs';
import { updateStints } from '../data/stints.mjs';
import { getTestLatestStints } from './testData.mjs';
import { getTestLatestTeamRadio } from './testData.mjs';
import { fetchDriverData } from '../data/driverData.mjs';
import { updateInterval } from '../data/intervals.mjs';
import { updatePositionsData } from '../data/positions.mjs';
import { testMergePositionWithIntervals } from './testMergeData.mjs';
import {
  groupDriversByInterval,
  setLatestGroupedIntervals,
} from '../data/groupIntervals.mjs';
import { broadcastToClient } from '../webSocket/broadcast.mjs';
import {
  getScheduleByLocation,
  initScheduleWatcher,
} from '../data/schedule.mjs';
import {
  simulateIntervalChange,
  simulateStintChange,
} from './testSimulator.mjs';
import {
  isMergedDataStale,
  isSessionExpired,
} from '../utils/webSocketUtils.mjs';

const PORT = process.env.PORT;
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
