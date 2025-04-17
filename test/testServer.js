import http from 'http';
import { envConfig } from '../utils/dotenv.config.js';
import { initMeetingWatcher } from '../data/meeting.js';
import { createTestWebSocketServer } from './testWebSocket.js';
import { printInfo } from '../utils/logger.js';
import { initSessionWatcher } from '../data/session.js';

const PORT = envConfig.PORT;

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
