export function setupWebSocketServer(server, port) {
  server.on('connection', (ws) => {
    console.log('Client connected');

    ws.send(
      JSON.stringify({
        message: 'Connected to OpenF1 WebSocket Server',
      })
    );

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  console.log(`WebSocket Server is running on ws://localhost:${port}`);
}