import { printMessage } from '../utils/logger.js';

const latestIntervalData = new Map();

// Get the latest interval data
export function getLatestInterval() {
  return Array.from(latestIntervalData.values());
}

// Update the latest interval data per driver
export function updateInterval(newIntervals) {
  printMessage('🔄 Updating interval...');

  newIntervals.forEach((entry) => {
    const existing = latestIntervalData.get(entry.driver_number);

    if (!existing || new Date(entry.date) > new Date(existing.date)) {
      latestIntervalData.set(entry.driver_number, entry);
    }
  });
}
