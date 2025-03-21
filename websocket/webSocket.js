import dotenv from 'dotenv';
import { WebSocketServer } from 'ws';
import { setupWebSocketServer } from './setupWebSocket.js';
import { startDataUpdates } from './dataUpdater.js';

dotenv.config();
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 4000;

export function createWebSocketServer(server, port) {
  const wss = new WebSocketServer({ server });

  setupWebSocketServer(wss, port);

  // Fetch both intervals and positions together every 4 seconds
  startDataUpdates(wss, UPDATE_INTERVAL);
}
