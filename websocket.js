import { WebSocketServer } from 'ws';
import { fetchIntervals, fetchPosition } from './openf1Api.js';
import { updateIntervalsData } from './intervals.js';
import { updatePositionsData } from './positions.js';

export function createWebSocketServer(port) {
  const server = new WebSocketServer({ port });

  setUpWebSocketServer(server);

  // Fetch and send interval data every 4 seconds
  setInterval(async () => {
    const intervals = await fetchIntervals();

    if (intervals.length > 0) {
      const groupedDrivers = groupDriversByInterval(intervals);

      server.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({
              type: 'grouped_intervals',
              data: groupedDrivers,
            })
          );
        }
      });
    }
  }, 4000);
}

function setUpWebSocketServer(server) {
  server.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(
      JSON.stringify({
        message: 'Connected to OpenF1 WebSocket Server',
      })
    );

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log(`WebSocket Server is running on ws://localhost:${port}`);
}
