import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { setupWebSocketServer } from './setupWebSocket.js';
import { startDataUpdates } from './dataUpdater.js';

// import { fetchIntervals, fetchPositions } from './openf1Api.js';
// import { updateIntervalsData } from '../updates/intervals.js';
// import { updatePositionsData } from '../updates/positions.js';

dotenv.config();
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 4000;

export function createWebSocketServer(server, port) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, port);

  // Fetch and send latest intervals & positions every 4 seconds
  // startIntervalUpdates(wss);
  // startPositionUpdates(wss);

  // Fetch both intervals and positions together every 4 seconds
  startDataUpdates(wss, UPDATE_INTERVAL);
}

// // Track last update time
// let lastIntervalTimestamp = null;
// let lastPositionTimestamp = null;

// // Fetch intervals and positions concurrently every 2 seconds
// // If the last timestamp is earlier than the latest timestamp update the data
// // otherwise, skip updating.
// // don't update.
// function startDataUpdates(wss, interval = 2000) {
//   setInterval(async () => {
//     try {
//       // Fetch intervals & positions asynchronously in parallel
//       const [intervals, positions] = await Promise.all([
//         fetchIntervals(),
//         fetchPositions(),
//       ]);

//       // Check if OpenF1 returns empty arrays
//       if (intervals.length > 0 && positions.length > 0) {
//         // Get the most recently fetched intervals and positions timestamp
//         const latestIntervalTimestamp = intervals[intervals.length - 1].date;
//         const latestPositionTimestamp = positions[positions.length - 1].date;

//         //
//         const intervalUpdated =
//           !lastIntervalTimestamp ||
//           new Date(latestIntervalTimestamp) > new Date(lastIntervalTimestamp);
//         const positionUpdated =
//           !lastPositionTimestamp ||
//           new Date(latestPositionTimestamp) > new Date(lastPositionTimestamp);

//         // Only update if at least one of the data sets has new updates
//         if (intervalUpdated || positionUpdated) {
//           lastIntervalTimestamp = latestIntervalTimestamp;
//           lastPositionTimestamp = latestPositionTimestamp;

//           const groupedIntervals = updateIntervalsData(intervals);
//           const updatedPositions = updatePositionsData(positions);

//           wss.clients.forEach((client) => {
//             if (client.readyState === 1) {
//               client.send(
//                 JSON.stringify({
//                   type: 'grouped_intervals',
//                   data: groupedIntervals,
//                 })
//               );

//               client.send(
//                 JSON.stringify({
//                   type: 'positions_update',
//                   data: updatedPositions,
//                 })
//               );
//             }
//           });
//         } else {
//           console.log('No new data, skipping update.');
//         }
//       } else {
//         console.log('No data available from OpenF1, skipping update.');
//       }
//     } catch (err) {
//       console.error('Error fetching or updating data:', err);
//     }
//   }, interval);
// }

// function startIntervalUpdates(wss, interval = 4000) {
//   setInterval(async () => {
//     const intervals = await fetchIntervals();
//     const groupedIntervals = updateIntervalsData(intervals);

//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send(
//           JSON.stringify({
//             type: 'grouped_intervals',
//             data: groupedIntervals,
//           })
//         );
//       }
//     });
//   }, interval);
// }

// function startPositionUpdates(wss, interval = 4000) {
//   setInterval(async () => {
//     const positions = await fetchPositions();
//     const updatedPositions = updatePositionsData(positions);

//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send(
//           JSON.stringify({
//             type: 'positions_update',
//             data: updatedPositions,
//           })
//         );
//       }
//     });
//   }, interval);
// }
