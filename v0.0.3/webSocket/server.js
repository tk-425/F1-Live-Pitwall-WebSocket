import http from 'http';
import dotenv from 'dotenv';
import { createWebSocketServer } from './webSocket.js';
import { startHttpServer } from './httpServer.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Create a single HTTP server instance
const server = http.createServer();

// Start WebSocket and HTTP server
createWebSocketServer(server);
startHttpServer(server, PORT);

// Start listening
server.listen(PORT, () => {
  console.log(
    `OpenF1 WebSocket & HTTP Server is running on http://localhost:${PORT}`
  );
});
