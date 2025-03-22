import express from 'express';
import { getLatestIntervals } from '../updates/intervals.js';
import { getLatestPositions } from '../updates/positions.js';

const app = express();

// HTTP route to server the latest interval groups
app.get('/current-intervals', (req, res) => {
  // fetch the latest interval
  const intervals = getLatestIntervals();

  res.json({
    type: 'grouped_intervals',
    data: intervals,
  });
});

// HTTP route to server the latest positions
app.get('/current-positions', (req, res) => {
  res.json({
    type: 'positions',
    data: getLatestPositions(),
  });
})

// Start the HTTP server
export function startHttpServer(server, port) {
  server.on('request', app);
}
