import { printMessage } from '../utils/logger.js';

const latestPositionData = new Map();

// Get the latest position data, sorted by position
export function getLatestPositions() {
  return Array.from(latestPositionData.values()).sort(
    (a, b) => a.position - b.position
  );
}

// Update the latest known position per driver.
// Only update if the new 'date' is more recent.
export function updatePositionsData(newPositions) {
  printMessage('🔄 Updating position...');

  newPositions.forEach((entry) => {
    const existing = latestPositionData.get(entry.driver_number);

    if (!existing || new Date(entry.date) > new Date(existing.date)) {
      latestPositionData.set(entry.driver_number, entry);
    }
  });
}
