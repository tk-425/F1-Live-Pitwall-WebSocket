import { WebSocket } from 'ws';
import { sendData } from './sendData.js';
import { SendDataType } from '../utils/sendDataType.js';

export function broadcastToClient(
  wss,
  merged,
  grouped,
  session,
  stints,
  teamRadio,
  meeting,
  currentSchedule
) {
  const sortedMerged = merged.sort((a, b) => a.position - b.position);

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      broadcastAllToClient(client, {
        grouped,
        merged: sortedMerged,
        session,
        stints,
        teamRadio,
        meeting,
        currentSchedule,
      });
    }
  });
}

export function broadcastAllToClient(
  client,
  { grouped, merged, session, stints, teamRadio, meeting, currentSchedule }
) {
  sendData(client, SendDataType.INTERVALS, grouped);
  sendData(client, SendDataType.POSITIONS, merged);
  sendData(client, SendDataType.SESSION, session);
  sendData(client, SendDataType.STINTS, stints);
  sendData(client, SendDataType.TEAM_RADIO, teamRadio);
  sendData(client, SendDataType.MEETING, meeting);
  sendData(client, SendDataType.SCHEDULE, currentSchedule)
}
