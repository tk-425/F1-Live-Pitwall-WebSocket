
export default function getInterval(allIntervals, driverNumber) {
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
