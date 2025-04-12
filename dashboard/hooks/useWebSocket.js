'use client';

import { useEffect, useRef, useState } from 'react';
import { SendDataType } from '@/utils/sendDataType';
import { printError, printMessage, printWarning } from '@/utils/logger';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WS_URL;
const RECONNECT_INTERVAL_MS = 4000;
const MAX_RECONNECT_ATTEMPTS = 5;

export function useWebSocket(url = WEBSOCKET_URL) {
  const [intervals, setIntervals] = useState([]);
  const [positions, setPositions] = useState([]);
  const [stints, setStints] = useState([]);
  const [teamRadio, setTeamRadio] = useState([]);
  const [session, setSession] = useState({});
  const [meeting, setMeeting] = useState({});
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [isServerDisconnected, setIsServerDisconnected] = useState(false);
  const [isServerClosed, setIsServerClosed] = useState(false);

  const wsRef = useRef(null);
  const reconnectTimeout = useRef(null);
  const reconnectAttempts = useRef(0);

  // const connect = () => {
  //   const ws = new WebSocket(url);
  //   wsRef.current = ws;

  //   ws.onopen = () => {
  //     printMessage('🖥️ Dashboard WebSocket connected.');
  //     reconnectAttempts.current = 0;
  //     setIsServerDisconnected(false);
  //   };

  //   ws.onmessage = (event) => {
  //     try {
  //       const message = JSON.parse(event.data);

  //       switch (message.type) {
  //         case SendDataType.INTERVALS:
  //           printMessage('📥 New intervals received:', message.data);
  //           setIntervals(message.data);
  //           break;
  //         case SendDataType.POSITIONS:
  //           printMessage('📥 New positions received:', message.data);
  //           setPositions(message.data);
  //           break;
  //         case SendDataType.SESSION:
  //           printMessage('📥 New session received:', message.data);
  //           setSession(message.data);
  //           break;
  //         case SendDataType.STINTS:
  //           printMessage('📥 New stints received:', message.data);
  //           setStints(message.data);
  //           break;
  //         case SendDataType.TEAM_RADIO:
  //           printMessage('📥 New team_radio received:', message.data);
  //           setTeamRadio(message.data);
  //           break;
  //         case SendDataType.MEETING:
  //           printMessage('📥 New meeting received:', message.data);
  //           setMeeting(message.data);
  //           break;
  //         case SendDataType.SCHEDULE:
  //           printMessage('📥 New schedule received:', message.data);
  //           setCurrentSchedule(message.data);
  //           break;
  //         default:
  //           printWarning('👽 Unknown message type:', message);
  //       }
  //     } catch (error) {
  //       printError('Failed to parse WebSocket message:', error);
  //     }
  //   };

  //   ws.onerror = (event) => {
  //     printError('❌ WebSocket error:', event);
  //     ws.close();
  //   };

  //   ws.onclose = () => {
  //     setIsServerDisconnected(true);
  //     printMessage('⛓️‍💥 WebSocket disconnected');

  //     if (reconnectAttempts.current < MAX_RECONNECT_ATTEMPTS) {
  //       reconnectAttempts.current += 1;
  //       printWarning(
  //         `🔁 Attempting reconnect ${
  //           reconnectAttempts.current
  //         }/${MAX_RECONNECT_ATTEMPTS} in ${RECONNECT_INTERVAL_MS / 1000}s...`
  //       );

  //       reconnectTimeout.current = setTimeout(() => {
  //         connect();
  //       }, RECONNECT_INTERVAL_MS);
  //     } else {
  //       printError('❌ Max reconnect attempts reached.');
  //       setIsServerClosed(true);
  //     }
  //   };
  // };

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
            case SendDataType.INTERVALS:
              printMessage('📥 New intervals received:', message.data);
              setIntervals(message.data);
              break;
            case SendDataType.POSITIONS:
              printMessage('📥 New positions received:', message.data);
              setPositions(message.data);
              break;
            case SendDataType.SESSION:
              printMessage('📥 New session received:', message.data);
              setSession(message.data);
              break;
            case SendDataType.STINTS:
              printMessage('📥 New stints received:', message.data);
              setStints(message.data);
              break;
            case SendDataType.TEAM_RADIO:
              printMessage('📥 New team_radio received:', message.data);
              setTeamRadio(message.data);
              break;
            case SendDataType.MEETING:
              printMessage('📥 New meeting received:', message.data);
              setMeeting(message.data);
              break;
            case SendDataType.SCHEDULE:
              printMessage('📥 New schedule received:', message.data);
              setCurrentSchedule(message.data);
              break;
            default:
              printWarning('👽 Unknown message type:', message);
          }
        } catch (error) {
          printError('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = (event) => {
        printError('❌ WebSocket error');
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
