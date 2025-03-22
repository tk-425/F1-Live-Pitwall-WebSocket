import http from 'http';
import dotenv from 'dotenv';
import { createWebSocketServer } from './webSocket.js';
import { startHttpServer } from './httpServer.js';

dotenv.config();

const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 4000;

// Start WebSocket server on port 3000
const PORT = process.env.PORT || 3000;

// Create a single HTTP server
const server = http.createServer();

createWebSocketServer(server, PORT, UPDATE_INTERVAL);

// Start HTTP server
startHttpServer(server, PORT);

server.listen(PORT, () => {
  console.log(
    `OpenF1 WebSocket & HTTP Server is running on http://localhost:${PORT}`
  );
});
