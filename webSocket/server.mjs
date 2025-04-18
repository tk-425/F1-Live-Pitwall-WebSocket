import http from 'http';
import { envConfig } from '../utils/dotenv.config.mjs';
import { initMeetingWatcher } from '../data/meeting.mjs';
import { createWebSocketServer } from './webSocket.mjs';
import { printInfo } from '../utils/logger.mjs';
import { initSessionWatcher } from '../data/session.mjs';

const PORT = process.env.PORT;

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