import { createWebSocketServer } from './websocket.js';

// Start WebSocket server on port 3000
const PORT = 3000;
createWebSocketServer(PORT);