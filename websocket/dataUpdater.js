import { fetchIntervals, fetchPositions } from './openf1Api.js';
import {
  updateIntervalsData,
  getLatestIntervals,
} from '../updates/intervals.js';
import {
  updatePositionsData,
  getLatestPositions,
} from '../updates/positions.js';

// Track last update time
let lastIntervalTimestamp = null;
let lastPositionTimestamp = null;

export function startDataUpdates(wss, interval = 4000) {
  setInterval(async () => {
    try {
      const [intervals, positions] = await Promise.all([
        fetchIntervals(),
        fetchPositions(),
      ]);

      let sendIntervals = false;
      let sendPositions = false;

      // Extract last timestamp safely
      const latestIntervalTimestamp =
        intervals.length > 0 ? intervals[intervals.length - 1].date : null;
      const latestPositionTimestamp =
        positions.length > 0 ? positions[positions.length - 1].date : null;

      // Detect if new data has arrived
      const intervalUpdated =
        latestIntervalTimestamp &&
        (!lastIntervalTimestamp ||
          new Date(latestIntervalTimestamp) > new Date(lastIntervalTimestamp));
      const positionUpdated =
        latestPositionTimestamp &&
        (!lastPositionTimestamp ||
          new Date(latestPositionTimestamp) > new Date(lastPositionTimestamp));

      // Process and broadcast only if new data is available
      if (intervalUpdated || positionUpdated) {
        if (intervalUpdated) {
          lastIntervalTimestamp = latestIntervalTimestamp;
          updateIntervalsData(intervals);
          sendIntervals = true;
        }

        if (positionUpdated) {
          lastPositionTimestamp = latestPositionTimestamp;
          updatePositionsData(positions);
          sendPositions = true;
        }

        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            if (sendIntervals) {
              client.send(
                JSON.stringify({
                  type: 'grouped_intervals',
                  data: getLatestIntervals(),
                })
              );
            }

            if (sendPositions) {
              client.send(
                JSON.stringify({
                  type: 'positions_update',
                  data: getLatestPositions(),
                })
              );
            }
          }
        });
      } else {
        console.log('No new data, skipping WebSocket broadcast.');
      }
    } catch (err) {
      console.error('Error fetching or updating data:', err);
    }
  }, interval);
}
