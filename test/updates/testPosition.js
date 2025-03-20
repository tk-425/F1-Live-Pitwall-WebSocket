import { getTestPositions } from '../data/testPositionsData.js';
import { updatePositionsData } from '../../updates/positions.js';

export function testPosition(server, interval = 2000) {
  setInterval(() => {
    const positions = getTestPositions();
    const updatedPositions = updatePositionsData(positions);

    server.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: 'positions_update',
            data: updatedPositions,
          })
        );
      }
    });
  }, interval);
}
