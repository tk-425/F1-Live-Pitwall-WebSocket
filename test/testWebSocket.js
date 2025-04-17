import { envConfig } from '../utils/dotenv.config.js';
import { WebSocketServer } from 'ws';
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
import { broadcastToClient } from '../webSocket/broadcast.js';
import {
  getScheduleByLocation,
  initScheduleWatcher,
} from '../data/schedule.js';
import {
  simulateIntervalChange,
  simulateStintChange,
} from './testSimulator.js';
import {
  isMergedDataStale,
  isSessionExpired,
} from '../utils/webSocketUtils.js';

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
