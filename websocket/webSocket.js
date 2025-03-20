import { WebSocketServer } from 'ws';
import { fetchIntervals, fetchPositions } from './openf1Api.js';
import { setupWebSocketServer } from './setupWebSocket.js';
import { updateIntervalsData } from '../updates/intervals.js';
import { updatePositionsData } from '../updates/positions.js';

export function createWebSocketServer(server, port) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, port);

  // Fetch and send latest intervals & positions every 4 seconds
  // startIntervalUpdates(wss);
  // startPositionUpdates(wss);

  // Fetch both intervals and positions together every 4 seconds
  startDataUpdates(wss);
}

// Track last update time
let lastFetchTimestamp = null;

// Fetch intervals and positions concurrently every 2 seconds
// If the last fetch timestamp is not greater than the currently fetched timestamp,
// don't update.
function startDataUpdates(wss, interval = 2000) {
  setInterval(async () => {
    try {
      // Fetch intervals & positions asynchronously in parallel
      const [intervals, positions] = await Promise.all([
        fetchIntervals(),
        fetchPositions(),
      ]);

      if (
        intervals.length > 0 &&
        positions.length > 0 &&
        new Date(intervals[0].date) > new Date(lastFetchTimestamp)
      ) {
        // Process and update the data
        const groupedIntervals = updateIntervalsData(intervals);
        const updatedPositions = updatePositionsData(positions);

        // Send updated data to WebSocket clients
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(
              JSON.stringify({
                type: 'grouped_intervals',
                data: groupedIntervals,
              })
            );

            client.send(
              JSON.stringify({
                type: 'positions_update',
                data: updatedPositions,
              })
            );
          }
        });
      } else {
        console.log('No new data, skipping update.');
      }
    } catch (err) {
      console.error('Error fetching or updating data:', err);
    }
  }, interval);
}

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
