export function handleClientHandshake(ws) {
  // Initial welcome message
  ws.send(
    JSON.stringify({
      message: '🔗 Connected to OpenF1 WebSocket Server',
    })
  );
}
