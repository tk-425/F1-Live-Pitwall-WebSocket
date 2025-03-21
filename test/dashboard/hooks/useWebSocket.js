import { useEffect, useState } from 'react';

export function useWebSocket(url = 'ws://localhost:3001') {
  const [intervals, setIntervals] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      console.log('📩 Raw event data:', event.data);

      let message;
      try {
        message =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        console.log('✅ Parsed message:', message);

        if (message.type === 'grouped_intervals') {
          console.log('🚀 Updating intervals');
          setIntervals(message.data);
        } else if (message.type === 'positions_update') {
          console.log('🚀 Updating positions');
          setPositions(message.data);
        }
      } catch (err) {
        console.error('❌ Failed to parse message:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    ws.onclose = () => {
      console.log('🔌 WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return { intervals, positions };
}
