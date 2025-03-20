import express from 'express';
import { getLatestIntervals } from '../../updates/intervals.js';
import { getLatestPositions } from '../../updates/positions.js';

const app = express();

// HTTP route to server the latest interval groups
app.get('/test-current-intervals', (req, res) => {
  // fetch the latest interval
  const intervals = getLatestIntervals();

  res.json({
    type: 'grouped_intervals',
    data: intervals,
  });
});

app.get('/test-current-positions', (req, res) => {
  res.json({
    type: 'positions',
    data: getLatestPositions(),
  });
})

// Start the HTTP server
export function testStartHttpServer(server, port) {
  server.on('request', app);
}
