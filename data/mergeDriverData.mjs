import { drivers } from '../info/info_drivers.mjs';

export function mergePositionWithIntervals(positions, intervals) {
  const intervalMap = new Map();

  intervals.forEach((interval) => {
    intervalMap.set(interval.driver_number, interval);
  });

  const merged = mergePositionIntervalData(positions, intervalMap);

  return merged.sort((a, b) => a.position - b.position);
}

function mergePositionIntervalData(positions, intervalMap) {
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
