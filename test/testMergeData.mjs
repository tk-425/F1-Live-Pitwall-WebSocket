import { drivers } from '../info/info_drivers.mjs';
import { getTestLatestPositions } from './testData.mjs';
import { getTestLatestInterval } from './testData.mjs';

// TEST
export function testMergePositionWithIntervals() {
  const positions = getTestLatestPositions();
  const intervals = getTestLatestInterval();

  const intervalMap = new Map();

  intervals.forEach((interval) => {
    intervalMap.set(interval.driver_number, interval);
  });

  const merged = testMergePositionIntervalData(positions, intervalMap);

  return merged.sort((a, b) => a.position - b.position);
}

function testMergePositionIntervalData(positions, intervalMap) {
  return positions.map((position) => {
    const interval = intervalMap.get(position.driver_number) || {};
    const info = drivers[position.driver_number] || {};

    return {
      driver_number: position.driver_number,
      position: position.position,
      interval: interval.interval ?? null,
      gap_to_leader: interval.gap_to_leader ?? null,
      session_key: position.session_key || interval.session_key,
      meeting_key: position.meeting_key || interval.meeting_key,
      date: interval.date || position.date,
      initial: info.initial ?? '???',
    };
  });
}