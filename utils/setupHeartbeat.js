export function setupHeartbeat(wss, interval = 30000) {
  // Heartbeat: Ping clients every 30 seconds
  const pingInterval = setInterval(() => {
    console.log(`👨‍👩‍👧‍👦 Active clients: ${wss.clients.size}`);

    wss.clients.forEach((client) => {
      if (!client.isAlive) {
        console.error('⛔ No pong - terminating stale client');
        return client.terminate();
      }

      client.isAlive = false;
      client.ping();
    });
  }, interval);

  wss.on('close', () => {
    clearInterval(pingInterval);
  });
}
