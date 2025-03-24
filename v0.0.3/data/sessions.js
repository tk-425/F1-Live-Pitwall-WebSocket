import { fetchSessions } from '../webSocket/openf1Api.js';
import { tryCatchSync } from '../utils/tryCatch.js';

let latestSession = null;

export function getLatestSession() {
  return latestSession;
}

export async function initSessionWatcher(interval = 10 * 60 * 1000) {
  // Fetch once on start
  await checkAndUpdateSession();

  setInterval(async () => {
    const now = new Date();

    if (!latestSession || new Date(latestSession.date_end) <= now) {
      await checkAndUpdateSession();
    } else {
      console.log('Session still active, no update needed.');
    }
  }, interval);
}

async function checkAndUpdateSession() {
  const [sessions, sessionError] = await tryCatchSync(fetchSessions());

  if (sessionError || !Array.isArray(sessions)) {
    console.error('Failed to fetch session:', sessionError?.message);
    return;
  }

  const newest = sessions.at(-1);

  if (!latestSession || newest.session_key !== latestSession.session_key) {
    latestSession = newest;

    console.log(
      `💾 Cached new session: ${newest.session_type} #${newest.session_key}`
    );
  }
}
