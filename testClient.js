import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3000');

ws.on('open', () => {
  console.log('Connected to WebSocket server');
});

ws.on('message', (data) => {
  const parsedData = JSON.parse(data);
  console.log('Received:', JSON.stringify(parsedData, null, 2)); // Pretty-print JSON
});
