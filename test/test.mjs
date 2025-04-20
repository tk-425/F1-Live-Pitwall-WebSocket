import { fetchDriverData } from '../data/driverData.mjs';
import {
  groupDriversByInterval,
  setLatestGroupedIntervals,
} from '../data/groupIntervals.mjs';
import { updateInterval } from '../data/intervals.mjs';
import { initMeetingWatcher } from '../data/meeting.mjs';
import { getTestLatestMeeting } from './testData.mjs';
import { testMergePositionWithIntervals } from './testMergeData.mjs';
import { updatePositionsData } from '../data/positions.mjs';
import { getTestLatestPositions } from './testData.mjs';
import { initScheduleWatcher } from '../data/schedule.mjs';
import { getScheduleForSession, initSessionWatcher } from '../data/session.mjs';
import { getTestLatestSession } from './testData.mjs';
import { getStintsByDriverNumber, updateStints } from '../data/stints.mjs';
import { printError, printMessage, printWarning } from '../utils/logger.mjs';
import { SendDataType } from '../utils/sendDataType.mjs';
import { isMergedDataStale } from '../utils/webSocketUtils.mjs';
import { isValidArray } from '../utils/checkArrayError.mjs';

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

  if (!isValidArray(intervals)) {
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
