import { WebSocket } from 'ws';
import { sendData } from './sendData.js';

export function broadcastToClient(wss, merged, grouped, session, stints) {
  const sortedMerged = merged.sort((a, b) => a.position - b.position);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      broadcastAllToClient(client, {
        grouped,
        merged: sortedMerged,
        session,
        stints,
      });
    }
  });
}

export function broadcastAllToClient(
  client,
  { grouped, merged, session, stints }
) {
  sendData(client, 'grouped_intervals', grouped);
  sendData(client, 'positions_update', merged);
  sendData(client, 'session', session);
  sendData(client, 'stints', stints);
}
