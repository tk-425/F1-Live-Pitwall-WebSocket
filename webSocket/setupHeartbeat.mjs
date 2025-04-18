import { printError, printMessage } from '../utils/logger.mjs';

export function setupHeartbeat(wss, interval = 30000) {
  // Heartbeat: Ping clients every 30 seconds
  const pingInterval = setInterval(() => {
    printMessage(`👨‍👩‍👧‍👦 Active clients: ${wss.clients.size}`);

    wss.clients.forEach((client) => {
      if (!client.isAlive) {
        printError('🚫 No pong - terminating stale client');
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
