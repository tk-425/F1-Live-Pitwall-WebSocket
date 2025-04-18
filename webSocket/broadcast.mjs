import { WebSocket } from 'ws';
import { sendData } from './sendData.mjs';
import { SendDataType } from '../utils/sendDataType.mjs';

export function broadcastToClient(
  wss,
  mergedPositionsAndIntervals,
  groupedIntervals,
  session,
  stints,
  teamRadio,
  meeting,
  currentSchedule
) {
  const sortedPosition = mergedPositionsAndIntervals.sort(
    (a, b) => a.position - b.position
  );

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      broadcastAllToClient(client, {
        mergedPositionsAndIntervals,
        sortedPosition,
        groupedIntervals,
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
  {
    mergedPositionsAndIntervals,
    sortedPosition,
    groupedIntervals,
    session,
    stints,
    teamRadio,
    meeting,
    currentSchedule,
  }
) {
  sendData(client, SendDataType.POSITIONS, sortedPosition);
  sendData(client, SendDataType.ALL_INTERVALS, mergedPositionsAndIntervals);
  sendData(client, SendDataType.INTERVALS, groupedIntervals);
  sendData(client, SendDataType.SESSION, session);
  sendData(client, SendDataType.STINTS, stints);
  sendData(client, SendDataType.TEAM_RADIO, teamRadio);
  sendData(client, SendDataType.MEETING, meeting);
  sendData(client, SendDataType.SCHEDULE, currentSchedule);
}
