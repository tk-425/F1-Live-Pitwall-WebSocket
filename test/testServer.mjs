import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { initMeetingWatcher } from '../data/meeting.mjs';
import { createTestWebSocketServer } from './testWebSocket.mjs';
import { printInfo } from '../utils/logger.mjs';
import { initSessionWatcher } from '../data/session.mjs';

const PORT = process.env.PORT;

async function startTestWebSocket() {
  const server = http.createServer();
  printInfo('🩻 TEST: F1-LiveUpdater HTTP server created');

  await initMeetingWatcher();
  await initSessionWatcher();

  // Start the WebSocket server
  createTestWebSocketServer(server);

  // Start listening
  server.listen(PORT, () => {
    printInfo(
      `🩻 TEST: F1-LiveUpdater Server is running on http://localhost:${PORT}`
    );
  });
}

startTestWebSocket();
