import {
  testIntervalsData,
  testStintsData,
  testTeamRadioData,
} from './testData.mjs';
import {
  groupDriversByInterval,
  setLatestGroupedIntervals,
} from '../data/groupIntervals.mjs';
import { testMergePositionWithIntervals } from './testMergeData.mjs';
import { broadcastToClient } from '../webSocket/broadcast.mjs';
import { getTestLatestSession } from './testData.mjs';
import { getTestLatestStints } from './testData.mjs';
import { getTestLatestTeamRadio } from './testData.mjs';
import { getTestLatestMeeting } from './testData.mjs';
import { getScheduleByLocation } from '../data/schedule.mjs';

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

    emitUpdatedData(wss);
    toggleLast = !toggleLast;
  }, 7000);
}

export function simulateTeamRadioUpdates(wss) {
  setInterval(() => {
    const driverNumber = 1;
    const entry = testTeamRadioData.find(
      (entry) => entry.driver_number === driverNumber
    );

    if (!entry) {
      return;
    }

    const now = new Date().toISOString();

    const newRadio = {
      session_key: 9998,
      meeting_key: 1255,
      driver_number: driverNumber,
      date: now,
      recording_url:
        'https://livetiming.formula1.com/static/2025/2025-04-06_Japanese_Grand_Prix/2025-04-06_Race/TeamRadio/MAXVER01_1_20250406_152735.mp3',
    };

    entry.radios.push(newRadio);

    emitUpdatedData(wss);
  }, 20000);
}

function emitUpdatedData(wss) {
  const session = getTestLatestSession();
  const stints = getTestLatestStints();
  const teamRadio = getTestLatestTeamRadio();
  const meeting = getTestLatestMeeting();
  const schedule = getScheduleByLocation(session.location);

  const merged = testMergePositionWithIntervals();
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
