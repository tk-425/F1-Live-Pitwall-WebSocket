import { getLatestIntervals } from '../updates/intervals.js';
import { getLatestPositions } from '../updates/positions.js';

export function setupWebSocketServer(wss, port) {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.isAlive = true;

    // When a pong is received, mark the client as alive
    ws.on('pong', () => {
      ws.isAlive = true;
    });

    // Initial welcome message
    ws.send(
      JSON.stringify({
        message: 'Connected to OpenF1 WebSocket Server',
      })
    );

    // ✅ Immediately send the latest known data
    const latestIntervals = getLatestIntervals();
    const latestPositions = getLatestPositions();

    if (latestIntervals.length > 0) {
      ws.send(
        JSON.stringify({
          type: 'grouped_intervals',
          data: latestIntervals,
        })
      );
    }

    if (latestPositions.length > 0) {
      ws.send(
        JSON.stringify({
          type: 'positions_update',
          data: latestPositions,
        })
      );
    }

    ws.on('close', () => {
      console.log('Client disconnected');
    });

    ws.on('error', (err) => {
      console.error('WebSocket client error:', err);
    });
  });

  // Global ping loop (runs once)
  const interval = setInterval(() => {
    console.log(`Active clients: ${wss.clients.size}`);

    wss.clients.forEach((client) => {
      if (client.isAlive === false) {
        console.error('No pong - terminating stale client');
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });

  console.log(`WebSocket Server is running on ws://localhost:${port}`);
}
