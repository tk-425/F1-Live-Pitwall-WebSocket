'use client';

import { useEffect, useRef, useState } from 'react';
import { SendDataType } from '@/utils/sendDataType';
import { printError, printMessage, printWarning } from '@/utils/logger';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL;
const RECONNECT_INTERVAL_MS = 4000;
const MAX_RECONNECT_ATTEMPTS = 5;

export function useWebSocket(url = WEBSOCKET_URL) {
  const [allIntervals, setAllIntervals] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [positions, setPositions] = useState([]);
  const [session, setSession] = useState({});
  const [stints, setStints] = useState([]);
  const [teamRadio, setTeamRadio] = useState([]);
  const [meeting, setMeeting] = useState({});
  const [currentSchedule, setCurrentSchedule] = useState({});

  const [isServerDisconnected, setIsServerDisconnected] = useState(false);
  const [isServerClosed, setIsServerClosed] = useState(false);

  const wsRef = useRef(null);
  const reconnectTimeout = useRef(null);
  const reconnectAttempts = useRef(0);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        printMessage('🖥️ Dashboard WebSocket connected.');
        reconnectAttempts.current = 0;
        setIsServerDisconnected(false);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          switch (message.type) {
            case SendDataType.POSITIONS:
              // printMessage('📥 New positions received.');
              setPositions(message.data);
              break;
            case SendDataType.ALL_INTERVALS:
              // printMessage('📥 New all_intervals received.');
              setAllIntervals(message.data);
              break;
            case SendDataType.INTERVALS:
              // printMessage('📥 New intervals received.');
              setIntervals(message.data);
              break;
            case SendDataType.SESSION:
              // printMessage('📥 New session received.');
              setSession(message.data);
              break;
            case SendDataType.STINTS:
              // printMessage('📥 New stints received.');
              setStints(message.data);
              break;
            case SendDataType.TEAM_RADIO:
              // printMessage('📥 New team_radio received.');
              setTeamRadio(message.data);
              break;
            case SendDataType.MEETING:
              // printMessage('📥 New meeting received.');
              setMeeting(message.data);
              break;
            case SendDataType.SCHEDULE:
              // printMessage('📥 New schedule received.');
              setCurrentSchedule(message.data);
              break;
            default:
              printMessage(message.message);
          }
        } catch (error) {
          printWarning('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = (event) => {
        printWarning('❌ WebSocket error');
        ws.close();
      };

      ws.onclose = () => {
        setIsServerDisconnected(true);
        printWarning('⛓️‍💥 WebSocket disconnected');

        if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttempts.current += 1;
          printWarning(
            `🔁 Attempting reconnect ${
              reconnectAttempts.current
            }/${MAX_RECONNECT_ATTEMPTS} in ${RECONNECT_INTERVAL_MS / 1000}s...`
          );

          reconnectTimeout.current = setTimeout(() => {
            connect();
          }, RECONNECT_INTERVAL_MS);
        } else {
          printError('❌ Max reconnect attempts reached.');
          setIsServerClosed(true);
        }
      };
    };

    connect();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      setIsServerClosed(true);
      printMessage('⛔ WebSocket connection closed.');
    };
  }, [url]);

  return {
    allIntervals,
    intervals,
    positions,
    stints,
    teamRadio,
    session,
    meeting,
    currentSchedule,
    isServerDisconnected,
    isServerClosed,
  };
}
