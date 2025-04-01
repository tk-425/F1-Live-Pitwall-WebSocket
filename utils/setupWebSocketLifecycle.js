export function setupWebSocketLifecycle(ws) {
  // Track if the client is alive
  ws.isAlive = true;

  // Listen for pong to confirm client is still response
  ws.on('pong', () => {
    ws.isAlive = true;
  });

  // Close the connection when the client disconnects
  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });

  // Error handling for WebSocket client
  ws.on('error', (err) => {
    console.error('❌ WebSocket client error:', err.message);
  });
}
