import { getTestIntervals } from '../data/testIntervalsData.js';
import { updateIntervalsData } from '../../updates/intervals.js';

export function testInterval(server, interval = 2000) {
  setInterval(() => {
    const intervals = getTestIntervals();
    const groupedDrivers = updateIntervalsData(intervals);

    server.clients.forEach((client) => {
      // Ensure client is open
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: 'grouped_intervals',
            data: groupedDrivers,
          })
        );
      }
    });
  }, interval);
}
