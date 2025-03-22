'use client';
import { useEffect, useState } from 'react';

export function useWebSocket(url = 'ws://localhost:3000') {
  const [intervals, setIntervals] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'grouped_intervals') {
          setIntervals(message.data);
        } else if (message.type === 'positions_update') {
          setPositions(message.data);
        }
      } catch (err) {
        console.error('❌ Failed to parse WebSocket message:', err);
      }
    };

    ws.onerror = (err) => console.error('❌ WebSocket error:', err);
    ws.onclose = () => console.log('🔌 WebSocket disconnected');

    return () => ws.close();
  }, [url]);

  return { intervals, positions };
}
