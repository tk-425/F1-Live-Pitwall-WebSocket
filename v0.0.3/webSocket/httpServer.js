import express from 'express';
import { getLatestGroupedIntervals } from '../data/groupedIntervalsStore.js';

const app = express();

// Serve the latest grouped interval data
app.get('/current-intervals', (req, res) => {
  const grouped = getLatestGroupedIntervals();

  res.json({
    type: 'grouped_intervals',
    data: grouped,
  });
});

// Attach the HTTP server
export function startHttpServer(server, port) {
  server.on('request', app);
  console.log(
    `HTTP server ready at http://localhost:${port}/current-intervals`
  );
}
