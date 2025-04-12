import { printMessage } from '../utils/logger.js';
import { testIntervalsData } from '../test/testData.js';

const latestIntervalData = new Map();

// Get the latest interval data
// export function getLatestInterval() {
//   return Array.from(latestIntervalData.values());
// }

// TEST: Dummy interval data
export function getLatestInterval() {
  return Array.from(testIntervalsData.values());
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
