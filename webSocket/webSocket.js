import { envConfig } from '../utils/dotenv.config.js';
import { WebSocketServer } from 'ws';
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
import { broadcastToClient } from './broadcast.js';
import {
  getScheduleByLocation,
  initScheduleWatcher,
} from '../data/schedule.js';
import {
  handleEmptyIntervals,
  isMergedDataStale,
  isSessionExpired,
} from '../utils/webSocketUtils.js';

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

    const mergedPositionsAndIntervals = mergePositionWithIntervals();
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
