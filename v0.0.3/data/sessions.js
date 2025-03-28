import { fetchSessions } from '../webSocket/openf1Api.js';
import { tryCatchSync } from '../utils/tryCatch.js';

let latestSession = null;

// export function getLatestSession() {
//   return latestSession;
// }

// Dummy session valid for 1 hour
export function getLatestSession() {
  return {
    session_key: 9999,
    session_type: 'Test',
    session_name: 'Dev Mode Test Session',
    date_start: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // started 5 min ago
    date_end: new Date(Date.now() + 55 * 60 * 1000).toISOString(), // ends in 55 min
    circuit_short_name: 'Test Track',
    location: 'Garage',
    country_name: 'Sandbox',
    gmt_offset: '+00:00',
    meeting_key: 1255,
    circuit_key: 1,
    country_key: 1,
    country_code: 'TST',
    year: new Date().getFullYear(),
  };
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

  if (!newest) {
    console.warn('⚠️ No sessions returned from fetchSessions()');
    return;
  }

  console.log(`📅 Latest session date_end: ${newest.date_end}`);

  if (!latestSession || newest.session_key !== latestSession.session_key) {
    latestSession = newest;

    console.log(
      `💾 Cached new session: ${newest.session_type} #${newest.session_key}`
    );
  }
}
