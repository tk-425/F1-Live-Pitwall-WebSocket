import http from 'http';
import dotenv from 'dotenv';
import { createWebSocketServer } from './webSocket.js';
import { startHttpServer } from './httpServer.js';
import { initSessionWatcher } from '../data/sessions.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Create a single HTTP server instance
const server = http.createServer();

// Start WebSocket and HTTP server
createWebSocketServer(server);
startHttpServer(server, PORT);

// Run session cache check every 10 min
await initSessionWatcher();

// Start listening
server.listen(PORT, () => {
  console.log(
    `🛜 OpenF1 WebSocket & HTTP Server is running on http://localhost:${PORT}`
  );
});
