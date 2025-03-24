const latestIntervalData = new Map();

// Updates the latest interval data per driver
export function updateIntervalSnapshot(newIntervals) {
  newIntervals.forEach((entry) => {
    const existing = latestIntervalData.get(entry.driver_number);

    if (!existing || new Date(entry.date) > new Date(existing.date)) {
      latestIntervalData.set(entry.driver_number, entry);
    }
  });
}

// Get the latest interval data
export function getLatestIntervals() {
  return Array.from(latestIntervalData.values());
}
