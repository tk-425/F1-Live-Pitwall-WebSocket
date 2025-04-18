import { SendDataType } from '../utils/sendDataType.mjs';
import { sendData } from '../webSocket/sendData.mjs';
import { getLatestGroupedIntervals } from '../data/groupIntervals.mjs';
import { getTestLatestPositions } from './testData.mjs';
import { getTestLatestSession } from './testData.mjs';
import { getTestLatestStints } from './testData.mjs';
import { getTestLatestTeamRadio } from './testData.mjs';

export function testSendInitData(ws) {
  const session = getTestLatestSession();
  const latestIntervals = getLatestGroupedIntervals();
  const latestPositions = getTestLatestPositions();
  const stints = getTestLatestStints();
  const teamRadio = getTestLatestTeamRadio();

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
