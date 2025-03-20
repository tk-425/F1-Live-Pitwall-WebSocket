import { WebSocketServer } from 'ws';
import { testPosition } from './testPosition.js';
import { testInterval } from './testInterval.js';

export function createTestWebSocketServer(port) {
  const server = new WebSocketServer({ port });

  setupWebSocketServer(server, port);

  // Test Position
  // testPosition(server);

  // Test Intervals
  testInterval(server);
}

function setupWebSocketServer(server, port) {
  server.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(
      JSON.stringify({
        message: 'Connected to Test OpenF1 WebSocket Server',
      })
    );

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log(`Test WebSocket Server is running on ws://localhost:${port}`);
}
