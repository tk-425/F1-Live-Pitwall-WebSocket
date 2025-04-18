import { checkError } from '../utils/checkArrayError.mjs';
import { printMessage, printWarning } from '../utils/logger.mjs';
import { SendDataType } from '../utils/sendDataType.mjs';
import { tryCatchSync } from '../utils/tryCatch.mjs';
import { watchStatus } from '../utils/watchStatus.mjs';
import { fetchSession } from '../webSocket/openF1Api.mjs';
import { getScheduleByLocation } from './schedule.mjs';

let latestSession = null;
let latestAllSessions = null;

export function getLatestSession() {
  return latestSession;
}

export function getAllSessions() {
  return latestAllSessions;
}

export async function initSessionWatcher(interval = 10 * 60 * 1000) {
  printMessage('▶️ Initializing session watcher...');

  // Fetch once on start
  await checkAndUpdateSession();

  watchStatus(
    interval,
    latestSession,
    SendDataType.SESSION,
    checkAndUpdateSession
  );
}

async function checkAndUpdateSession() {
  printMessage('🔄 Checking for new session...');

  const [session, sessionError] = await tryCatchSync(fetchSession());

  checkError(session, sessionError, SendDataType.SESSION);

  const newest = session[0];

  if (!newest) {
    printWarning('⚠️ No sessions returned from fetchSessions()');
    return;
  }

  if (!latestSession || newest.session_key !== latestSession.session_key) {
    latestSession = newest;

    // printMessage(
    //   `💾 Cached new session: ${newest.session_type} #${newest.session_key}`
    // );
  }
}

export function getScheduleForSession(session) {
  if (!session?.location) return null;

  const scheduleEntry = getScheduleByLocation(session.location);
  return scheduleEntry?.sessions ?? null;
}
