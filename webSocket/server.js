import http from 'http';
import { envConfig } from '../utils/dotenv.config.js';
import { initMeetingWatcher } from '../data/meeting.js';
import { createWebSocketServer } from './webSocket.js';
import { printInfo } from '../utils/logger.js';
import { initSessionWatcher } from '../data/session.js';

const PORT = envConfig.PORT;

async function startWebSocket() {
  const server = http.createServer();
  printInfo('😀 F1-LiveUpdater HTTP server created');

  await initMeetingWatcher();
  await initSessionWatcher();

  // Start the WebSocket server
  createWebSocketServer(server);

  // Start listening
  server.listen(PORT, () => {
    printInfo(`🛜 F1-LiveUpdater Server is running on http://localhost:${PORT}`);
  });
}

startWebSocket();