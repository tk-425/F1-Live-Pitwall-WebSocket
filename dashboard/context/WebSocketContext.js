'use client';

import { createContext, useContext } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const data = useWebSocket();

  return (
    <WebSocketContext.Provider value={data}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error(
      'useWebSocketContext must be used within a WebSocketProvider'
    );
  }
  return context;
}
