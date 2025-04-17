import { setLatestGroupedIntervals } from '../data/groupIntervals.js';
import { mergePositionWithIntervals } from '../data/mergeDriverData.js';
import { updatePositionsData } from '../data/positions.js';
import { broadcastAllToClient } from '../webSocket/broadcast.js';
import { printWarning } from './logger.js';

export function isSessionExpired(session) {
  if (!session) {
    printWarning('🚫 No session object found.');
    return true;
  }

  const now = new Date();
  const originalEnd = session.date_end ? new Date(session.date_end) : null;

  if (!originalEnd || isNaN(originalEnd)) {
    printWarning(
      '⚠️ session.date_end is missing or invalid. Assuming session is active.'
    );
    return false;
  }

  // 1 hour buffer for session delay (e.g. red flag, weather, etc.)
  const BUFFER_MS = 60 * 60 * 1000;
  const adjustedEnd = new Date(originalEnd.getTime() + BUFFER_MS);

  return adjustedEnd < now;
}

export function isMergedDataStale(session, merged) {
  if (!Array.isArray(merged) || merged.length === 0) {
    return true;
  }

  const first = merged[0];

  return session?.session_key !== first?.session_key;
}

export function handleEmptyIntervals(
  wss,
  positions,
  session,
  stints,
  teamRadio,
  meeting,
  currentSchedule
) {
  printWarning('F1-LiveUpdater returned empty intervals.');

  // Clear grouped cache
  setLatestGroupedIntervals([]);
  // Still update positions
  updatePositionsData(positions);

  const mergedPositionsAndIntervals = mergePositionWithIntervals();
  const sortedMerged = mergedPositionsAndIntervals
    .slice()
    .sort((a, b) => a.position - b.position);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      broadcastAllToClient(client, {
        mergedPositionsAndIntervals,
        sortedMerged,
        grouped: [],
        session,
        stints,
        teamRadio,
        meeting,
        currentSchedule,
      });
    }
  });
}
