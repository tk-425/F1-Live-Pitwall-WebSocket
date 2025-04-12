import { fetchTeamRadio } from '../webSocket/openF1Api.js';
import { tryCatchSync } from '../utils/tryCatch.js';
import { testTeamRadioData } from '../test/testData.js';
import { printMessage } from '../utils/logger.js';

let latestTeamRadio = new Map();

// export function getLatestTeamRadio() {
//   return Array.from(latestTeamRadio.values());
// }

// TEST: Dummy team radio data
export function getLatestTeamRadio() {
  return Array.from(testTeamRadioData.values());
}

export function getTeamRadioByDriver(driverNumber) {
  const entry = latestTeamRadio.get(driverNumber);
  return entry ? entry.radios : [];
}

export async function updateTeamRadio() {
  printMessage('🔄 Updating team radio...');

  const [teamRadios, teamRadioError] = await tryCatchSync(fetchTeamRadio());

  if (teamRadioError || !Array.isArray(teamRadios)) {
    console.error('Failed to fetch team radio:', teamRadioError?.message);
    return;
  }

  for (const entry of teamRadios) {
    const { driver_number } = entry;
    const existing = latestTeamRadio.get(driver_number);

    if (!existing) {
      latestTeamRadio.set(driver_number, {
        driver_number,
        radios: [entry],
      });
    } else {
      const isDuplicate = existing.radios.some(
        (r) => r.recording_url === radio.recording_url
      );

      if (!isDuplicate) {
        existing.radios.push(radio);
        existing.radios.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      latestTeamRadio.set(driver_number, {
        driver_number,
        radios: existing.radios,
      });
    }
  }
}
