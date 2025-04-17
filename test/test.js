import { fetchDriverData } from '../data/driverData.js';
import {
  groupDriversByInterval,
  setLatestGroupedIntervals,
} from '../data/groupIntervals.js';
import { updateInterval } from '../data/intervals.js';
import { initMeetingWatcher } from '../data/meeting.js';
import { getTestLatestMeeting } from './testData.js';
import { testMergePositionWithIntervals } from './testMergeData.js';
import { updatePositionsData } from '../data/positions.js';
import { getTestLatestPositions } from './testData.js';
import { initScheduleWatcher } from '../data/schedule.js';
import { getScheduleForSession, initSessionWatcher } from '../data/session.js';
import { getTestLatestSession } from './testData.js';
import { getStintsByDriverNumber, updateStints } from '../data/stints.js';
import { printError, printMessage, printWarning } from '../utils/logger.js';
import { SendDataType } from '../utils/sendDataType.js';
import { isMergedDataStale } from '../utils/webSocketUtils.js';

// Fetch data from the API
await initMeetingWatcher(5000);
await initSessionWatcher(5000);
await updateStints();
const session = getTestLatestSession();

// TEST
testMeeting();
testSession(session);
await testSchedule(session);
await testStints();
// await testIntervalsAndPositions();
await testIntervalsAndPositions(session);

/* --------------------------------------------------------------------- */
// TEST FUNCTIONS
function testMeeting() {
  printMessage(SendDataType.MEETING, getTestLatestMeeting());
  divider();
}

function testSession(session) {
  printMessage(SendDataType.SESSION, session);
  divider();
}

async function testSchedule(session) {
  initScheduleWatcher();
  printMessage(SendDataType.SCHEDULE, getScheduleForSession(session));
  divider();
}

async function testStints() {
  const stints81 = getStintsByDriverNumber(81);
  printMessage(SendDataType.STINTS, stints81);
  divider();
}

async function testIntervalsAndPositions(session) {
  const { intervals, positions, error } = await fetchDriverData();

  if (error) {
    printError('Fetch error:', error);
    return;
  }

  if (!Array.isArray(intervals) || intervals.length === 0) {
    printError('No intervals available.');
    return;
  }

  updateInterval(intervals);
  updatePositionsData(positions);

  const merged = testMergePositionWithIntervals();
  const grouped = groupDriversByInterval(merged);

  setLatestGroupedIntervals(grouped);

  if (isMergedDataStale(session, merged)) {
    printWarning('No new session data available yet.');
    return;
  }

  const groupedInterval = groupDriversByInterval(grouped);
  printMessage(SendDataType.INTERVALS, groupedInterval);
  divider();

  printMessage(SendDataType.POSITIONS, getTestLatestPositions());
  divider();
}

function divider() {
  console.log('---------------------------------------------------------');
}
