import { checkError } from '../utils/checkArrayError.mjs';
import { printMessage, printWarning } from '../utils/logger.mjs';
import { SendDataType } from '../utils/sendDataType.mjs';
import { tryCatchSync } from '../utils/tryCatch.mjs';
import { watchStatus } from '../utils/watchStatus.mjs';
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
