import { getLatestSession } from '../data/sessions.js';
import { getLatestGroupedIntervals } from '../data/groupedIntervalsStore.js';
import { getLatestPositions } from '../data/positions.js';
import { getLatestStints } from '../data/stints.js';
import { sendData } from './sendData.js';

export function sendInitData(ws) {
  const session = getLatestSession();
  const latestIntervals = getLatestGroupedIntervals();
  const latestPositions = getLatestPositions();
  const stints = getLatestStints();

  const currentSessionKey = session?.session_key;
  const intervalSessionKey = latestIntervals?.session_key;
  const positionSessionKey = latestPositions?.session_key;
  const isSessionEnded =
    currentSessionKey !== intervalSessionKey ||
    currentSessionKey !== positionSessionKey;

  // Send session info if available
  if (session) {
    sendData(ws, 'session', session);
  }

  // Send the latest grouped intervals if available
  if (latestIntervals.length > 0 && !isSessionEnded) {
    sendData(ws, 'grouped_intervals', latestIntervals);
  }

  // Send latest positions if available
  if (latestPositions.length > 0 && !isSessionEnded) {
    sendData(ws, 'positions_update', latestPositions);
  }

  // Send stints info if available
  if (stints.length > 0 && !isSessionEnded) {
    sendData(ws, 'stints', stints);
  }
}
