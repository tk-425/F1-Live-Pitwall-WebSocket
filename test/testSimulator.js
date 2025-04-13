import { testIntervalsData, testStintsData } from './testData.js';
import {
  groupDriversByInterval,
  setLatestGroupedIntervals,
} from '../data/groupIntervals.js';
import { mergePositionWithIntervals } from '../data/mergeDriverData.js';
import { broadcastToClient } from '../webSocket/broadcast.js';
import { getLatestSession } from '../data/session.js';
import { getLatestStints } from '../data/stints.js';
import { getLatestTeamRadio } from '../data/teamRadio.js';
import { getLatestMeeting } from '../data/meeting.js';
import { getScheduleByLocation } from '../data/schedule.js';
import { printMessage } from '../utils/logger.js';

export function simulateIntervalChange(wss) {
  let toggled = false;

  setInterval(() => {
    const driver63 = testIntervalsData.get(63);
    const driver23 = testIntervalsData.get(23);

    if (driver63 && driver23) {
      driver63.interval = toggled ? 5.012 : 2.855;
      driver63.date = new Date().toISOString();
      testIntervalsData.set(63, { ...driver63 });

      driver23.interval = toggled ? 5.004 : 1.999;
      driver23.date = new Date().toISOString();
      testIntervalsData.set(23, { ...driver23 });

      // printMessage('🚦 Simulated interval update: driver 63 & 23');

      toggled = !toggled;

      emitUpdatedData(wss);
    }
  }, 7000);
}

export function simulateStintChange(wss) {
  let toggleFirst = false;
  let toggleLast = false;

  // Toggle FIRST stint compound every 5s
  setInterval(() => {
    const targetDriver = testStintsData.find(
      (entry) => entry.driver_number === 1
    );

    if (!targetDriver || targetDriver.stints.length === 0) return;

    const firstStint = targetDriver.stints[0];
    firstStint.compound = toggleFirst ? 'MEDIUM' : 'UNKNOWN';

    // printMessage(
    //   `🧪 Simulated stint update: driver 1 FIRST compound = ${firstStint.compound}`
    // );

    emitUpdatedData(wss);
    toggleFirst = !toggleFirst;
  }, 5000);

  // Toggle LAST stint compound every 7s
  setInterval(() => {
    const targetDriver = testStintsData.find(
      (entry) => entry.driver_number === 1
    );

    if (!targetDriver || targetDriver.stints.length === 0) return;

    const latestStint = targetDriver.stints.at(-1);
    latestStint.compound = toggleLast ? 'SOFT' : 'UNKNOWN';

    // printMessage(
    //   `🧪 Simulated stint update: driver 1 LAST compound = ${latestStint.compound}`
    // );

    emitUpdatedData(wss);
    toggleLast = !toggleLast;
  }, 7000);
}

function emitUpdatedData(wss) {
  const session = getLatestSession();
  const stints = getLatestStints();
  const teamRadio = getLatestTeamRadio();
  const meeting = getLatestMeeting();
  const schedule = getScheduleByLocation(session.location);

  const merged = mergePositionWithIntervals();
  const grouped = groupDriversByInterval(merged);

  setLatestGroupedIntervals(grouped);

  broadcastToClient(
    wss,
    merged,
    grouped,
    session,
    stints,
    teamRadio,
    meeting,
    schedule
  );
}
