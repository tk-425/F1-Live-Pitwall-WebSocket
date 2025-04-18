import { checkError } from '../utils/checkArrayError.js';
import { printMessage, printWarning } from '../utils/logger.js';
import { SendDataType } from '../utils/sendDataType.js';
import { tryCatchSync } from '../utils/tryCatch.js';
import { watchStatus } from '../utils/watchStatus.js';
import { fetchMeeting } from '../webSocket/openF1Api.mjs';

let latestMeeting = null;

export function getLatestMeeting() {
  return latestMeeting;
}

export async function initMeetingWatcher(interval = 10 * 60 * 1000) {
  printMessage('▶️ Initializing meeting watcher...');

  // Fetch once on start
  await checkAndUpdateMeeting();

  watchStatus(
    interval,
    latestMeeting,
    SendDataType.MEETING,
    checkAndUpdateMeeting
  );
}

async function checkAndUpdateMeeting() {
  printMessage('🔄 Checking for latest meeting...');

  const [meeting, meetingError] = await tryCatchSync(fetchMeeting());

  // Check if meeting is not available
  checkError(meeting, meetingError, SendDataType.MEETING);

  const newest = meeting[0];

  if (!newest) {
    printWarning('⚠️ No meetings returned from fetchMeeting()');
    return;
  }

  latestMeeting = newest;
}
