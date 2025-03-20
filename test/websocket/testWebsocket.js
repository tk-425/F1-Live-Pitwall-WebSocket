import { WebSocketServer } from 'ws';
import { testPosition } from '../updates/testPosition.js';
import { testInterval } from '../updates/testInterval.js';
import { setupWebSocketServer } from '../../websocket/setupWebSocket.js';

export function testCreateWebSocketServer(server, port) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, port);

  // Test Position
  testPosition(wss);

  // Test Intervals
  testInterval(wss);
}