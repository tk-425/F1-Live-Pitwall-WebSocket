import http from 'http';
import { createWebSocketServer } from './websocket.js';
import { startHttpServer } from './httpServer.js';

// Start WebSocket server on port 3000
const PORT = 3000;

// Create a single HTTP server
const server = http.createServer();

createWebSocketServer(server, PORT);

// Start HTTP server
startHttpServer(server, PORT);

server.listen(PORT, () => {
  console.log(
    `OpenF1 WebSocket & HTTP Server is running on http://localhost:${PORT}`
  );
})