import { tryCatchSync } from '../utils/tryCatch.js';
import { fetchIntervals, fetchPositions } from '../webSocket/openF1Api.js';

export async function fetchDriverData() {
  const [intervals, intervalError] = await tryCatchSync(fetchIntervals());
  const [positions, positionError] = await tryCatchSync(fetchPositions());

  if (intervalError || positionError) {
    return {
      intervals: [],
      positions: [],
      error: {
        interval: intervalError?.message,
        position: positionError?.message,
      },
    };
  }

  return { intervals, positions, error: null };
}
