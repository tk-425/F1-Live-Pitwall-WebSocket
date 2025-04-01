import http from 'http';
import dotenv from 'dotenv';
import { createWebSocketServer } from './webSocket.js';
import { startHttpServer } from './httpServer.js';
import { initSessionWatcher } from '../data/sessions.js';
import { envPath } from '../utils/envPath.js';

dotenv.config(envPath);

const PORT = process.env.PORT || 3000;

async function startApplication() {
  // Create a single HTTP server instance
  const server = http.createServer();

  // Run session cache check every 10 min
  await initSessionWatcher();

  // Start WebSocket and HTTP server
  createWebSocketServer(server);
  startHttpServer(server, PORT);

  // Start listening
  server.listen(PORT, () => {
    console.log(
      `🛜 OpenF1 WebSocket & HTTP Server is running on http://localhost:${PORT}`
    );
  });
}

startApplication();
