import { WebSocketServer } from 'ws';
import { setupWebSocketServer } from './setupWebSocket.js';
import { startDataUpdates } from './dataUpdater.js';

export function createWebSocketServer(server, port, updateInterval) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, port);

  // Fetch both intervals and positions together every 4 seconds
  startDataUpdates(wss, updateInterval);
}
