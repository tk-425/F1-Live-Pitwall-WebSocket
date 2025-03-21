import { WebSocketServer } from 'ws';
import { setupWebSocketServer } from '../../websocket/setupWebSocket.js';
import { getTestIntervals } from '../data/testIntervalsData.js';
import { getTestPositions } from '../data/testPositionsData.js';
import { updateIntervalsData } from '../../updates/intervals.js';
import { updatePositionsData } from '../../updates/positions.js';

export function testCreateWebSocketServer(server, port) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, port);

  // Fetch both intervals and positions together
  startDataUpdates(wss);
}

// Fetch intervals and positions concurrently every 4 seconds
function startDataUpdates(wss, interval = 2000) {
  setInterval(async () => {
    // Process and update the data
    try {
      // Fetch intervals & positions asynchronously in parallel
      const [intervals, positions] = await Promise.all([
        getTestIntervals(),
        getTestPositions(),
      ]);

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
    } catch (err) {
      console.error('Error fetching or updating data:', err);
    }
  }, interval);
}
