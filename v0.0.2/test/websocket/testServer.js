import http from 'http';
import { testCreateWebSocketServer } from './testWebsocket.js';
import { testStartHttpServer } from './testHttpServer.js';

// Start WebSocket server on port 3000
const PORT = 3001;

// Create a single HTTP server
const server = http.createServer();

testCreateWebSocketServer(server, PORT);

testStartHttpServer(server, PORT);

server.listen(PORT, () => {
  console.log(
    `Test WebSocket & HTTP Server is running on http://localhost:${PORT}`
  );
});
