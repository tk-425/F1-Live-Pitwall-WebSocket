import { schedule_2025 } from '../info/info_schedule2025.mjs';
import { printMessage, printWarning } from '../utils/logger.mjs';

let allSchedules = null;

export function initScheduleWatcher() {
  printMessage('▶️ Initializing schedule watcher...');
  allSchedules = schedule_2025;
}

export function getAllSchedules() {
  return allSchedules;
}


export function getScheduleByLocation(location) {
  if (!allSchedules) {
    printWarning('⚠️ Schedule not initialized yet.');
    return null;
  }

  return allSchedules.find(
    (entry) => entry.location.toLowerCase() === location.toLowerCase()
  );
}
