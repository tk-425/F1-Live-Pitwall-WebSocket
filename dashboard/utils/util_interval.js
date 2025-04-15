export function getInterval(allIntervals, driverNumber) {
  const entry = allIntervals.find((d) => d.driver_number === driverNumber);

  if (!entry) {
    return 'N/A';
  }

  if (entry.interval === null && entry.gap_to_leader === 0) {
    return 'Leader';
  }

  if (typeof entry.interval === 'number') {
    return entry.interval.toFixed(3);
  }

  return 'N/A';
}

export function formatInterval(interval, gapToLeader) {
  if (interval === null && gapToLeader === 0) {
    return 'Leader';
  }

  if (typeof interval === 'number') {
    return interval.toFixed(3);
  }

  return 'N/A';
}

export function formatGap(gapToLeader) {
  if (gapToLeader === null || gapToLeader === 0) {
    return 'Leader';
  }

  return gapToLeader.toFixed(3);
}
