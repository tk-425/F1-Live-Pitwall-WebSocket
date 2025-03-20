import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:3001');

ws.on('open', () => {
  console.log('Connected to WebSocket server');
});

ws.on('message', (data) => {
  const parsedData = JSON.parse(data);
  console.log('Test Received:\n', JSON.stringify(parsedData, null, 2));
});
