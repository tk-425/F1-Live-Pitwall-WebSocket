import { WebSocketServer } from 'ws';
import { fetchIntervals, fetchPositions } from './openf1Api.js';
import { setupWebSocketServer } from './setupWebSocket.js';
import { updateIntervalsData } from '../updates/intervals.js';
import { updatePositionsData } from '../updates/positions.js';

export function createWebSocketServer(server, port) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, port);

  // Fetch and send latest intervals every 4 seconds
  startIntervalUpdates(wss);

  // Fetch and send latest positions every 4 seconds
  startPositionUpdates(wss);
}



function startIntervalUpdates(wss, interval = 4000) {
  setInterval(async () => {
    const intervals = await fetchIntervals();
    const groupedIntervals = updateIntervalsData(intervals);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: 'grouped_intervals',
            data: groupedIntervals,
          })
        );
      }
    });
  }, 4000);
}

function startPositionUpdates(wss, interval = 4000) {
  setInterval(async () => {
    const positions = await fetchPositions();
    const updatedPositions = updatePositionsData(positions);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: 'positions_update',
            data: updatedPositions,
          })
        );
      }
    });
  }, 4000);
}
