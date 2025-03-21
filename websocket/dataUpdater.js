import { fetchIntervals, fetchPositions } from './openf1Api.js';
import {
  updateIntervalsData,
  getLatestIntervals,
} from '../updates/intervals.js';
import {
  updatePositionsData,
  getLatestPositions,
} from '../updates/positions.js';
import { tryCatch } from '../utils/tryCatch.js';

// Track last update time
let lastIntervalTimestamp = null;
let lastPositionTimestamp = null;

export function startDataUpdates(wss, interval = 4000) {
  // setInterval(async () => {
  //   try {
  //     const [intervals, positions] = await Promise.all([
  //       fetchIntervals(),
  //       fetchPositions(),
  //     ]);

  //     let sendIntervals = false;
  //     let sendPositions = false;

  //     // Extract last timestamp safely
  //     const latestIntervalTimestamp =
  //       intervals.length > 0 ? intervals[intervals.length - 1].date : null;
  //     const latestPositionTimestamp =
  //       positions.length > 0 ? positions[positions.length - 1].date : null;

  //     // Detect if new data has arrived
  //     const intervalUpdated =
  //       latestIntervalTimestamp &&
  //       (!lastIntervalTimestamp ||
  //         new Date(latestIntervalTimestamp) > new Date(lastIntervalTimestamp));
  //     const positionUpdated =
  //       latestPositionTimestamp &&
  //       (!lastPositionTimestamp ||
  //         new Date(latestPositionTimestamp) > new Date(lastPositionTimestamp));

  //     // Process and broadcast only if new data is available
  //     if (intervalUpdated || positionUpdated) {
  //       if (intervalUpdated) {
  //         lastIntervalTimestamp = latestIntervalTimestamp;
  //         updateIntervalsData(intervals);
  //         sendIntervals = true;
  //       }

  //       if (positionUpdated) {
  //         lastPositionTimestamp = latestPositionTimestamp;
  //         updatePositionsData(positions);
  //         sendPositions = true;
  //       }

  //       wss.clients.forEach((client) => {
  //         if (client.readyState === 1) {
  //           if (sendIntervals) {
  //             client.send(
  //               JSON.stringify({
  //                 type: 'grouped_intervals',
  //                 data: getLatestIntervals(),
  //               })
  //             );
  //           }

  //           if (sendPositions) {
  //             client.send(
  //               JSON.stringify({
  //                 type: 'positions_update',
  //                 data: getLatestPositions(),
  //               })
  //             );
  //           }
  //         }
  //       });
  //     } else {
  //       console.log('No new data, skipping WebSocket broadcast.');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching or updating data:', err);
  //   }
  // }, interval);

  setInterval(async () => {
    const [intervals, intervalError] = await tryCatch(fetchIntervals());
    const [positions, positionError] = await tryCatch(fetchPositions());

    let shouldSendIntervals = !intervalError && handleIntervals(intervals);
    let shouldSendPositions = !positionError && handlePositions(positions);

    const bothFailed = checkErrors(intervalError, positionError);

    if (bothFailed) {
      return;
    }

    sendData(wss, shouldSendIntervals, shouldSendPositions);
  }, interval);
}

function handleIntervals(intervals) {
  if (!Array.isArray(intervals) || intervals.length === 0) return false;

  const latestTimestamp = intervals[intervals.length - 1].date;

  const isUpdated =
    !lastIntervalTimestamp ||
    new Date(latestTimestamp) > new Date(lastIntervalTimestamp);

  if (isUpdated) {
    lastIntervalTimestamp = latestTimestamp;
    updateIntervalsData(intervals);
    return true;
  }

  return false;
}

function handlePositions(positions) {
  if (!Array.isArray(positions) || positions.length === 0) return false;

  const latestTimestamp = positions[positions.length - 1].date;

  const isUpdated =
    !lastPositionTimestamp ||
    new Date(latestTimestamp) > new Date(lastPositionTimestamp);

  if (isUpdated) {
    lastPositionTimestamp = latestTimestamp;
    updatePositionsData(positions);
    return true;
  }

  return false;
}

function checkErrors(intervalError, positionError) {
  if (intervalError) {
    console.error('Error fetching intervals:', intervalError.message);
  }

  if (positionError) {
    console.error('Error fetching positions:', positionError.message);
  }

  return intervalError && positionError;
}

function sendData(wss, shouldSendIntervals, shouldSendPositions) {
  if (!shouldSendIntervals && !shouldSendPositions) {
    console.log('No new data, skipping WebSocket broadcast.');
    return;
  }

  const latestIntervals = shouldSendIntervals ? getLatestIntervals() : null;
  const latestPositions = shouldSendPositions ? getLatestPositions() : null;

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      if (shouldSendIntervals) {
        sendToClient(client, 'grouped_intervals', latestIntervals);
      }
      if (shouldSendPositions) {
        sendToClient(client, 'positions_update', latestPositions);
      }
    }
  });
}

async function sendToClient(client, type, data) {
  const [, sendError] = await tryCatch(
    // Convert into a promise
    Promise.resolve().then(() => {
      client.send(JSON.stringify({ type, data }));
    })
  );

  if (sendError) {
    console.error('WebSocket send failed:', sendError.message);
  }
}
