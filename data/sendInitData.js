import { SendDataType } from '../utils/sendDataType.js';
import { sendData } from '../webSocket/sendData.js';
import { getLatestGroupedIntervals } from './groupIntervals.js';
import { getLatestPositions } from './positions.js';
import { getLatestSession } from './session.js';
import { getLatestStints } from './stints.js';
import { getLatestTeamRadio } from './teamRadio.js';

export function sendInitData(ws) {
  const session = getLatestSession();
  const latestIntervals = getLatestGroupedIntervals();
  const latestPositions = getLatestPositions();
  const stints = getLatestStints();
  const teamRadio = getLatestTeamRadio();

  const currentSessionKey = session?.session_key;
  const intervalSessionKey = latestIntervals?.session_key;
  const positionSessionKey = latestPositions?.session_key;
  const isSessionEnded =
    currentSessionKey !== intervalSessionKey ||
    currentSessionKey !== positionSessionKey;

  // Send session info if available
  if (session) {
    sendData(ws, SendDataType.SESSION, session);
  }
 
  // Send the latest grouped intervals if available
  if (latestIntervals.length > 0 && !isSessionEnded) {
    sendData(ws, SendDataType.GROUPED_INTERVALS, latestIntervals);
  }

  // Send latest positions if available
  if (latestPositions.length > 0 && !isSessionEnded) {
    sendData(ws, SendDataType.POSITIONS_UPDATE, latestPositions);
  }

  // Send stints info if available
  if (stints.length > 0 && !isSessionEnded) {
    sendData(ws, SendDataType.STINTS, stints);
  }

  // Send team radio if available
  if (teamRadio.length > 0 && !isSessionEnded) {
    sendData(ws, SendDataType.TEAM_RADIO, teamRadio);
  }
}
