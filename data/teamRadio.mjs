// import { fetchTeamRadio } from '../webSocket/openF1Api.mjs';
// import { tryCatchSync } from '../utils/tryCatch.mjs';
// import { printMessage } from '../utils/logger.mjs';

// let latestTeamRadio = new Map();

// export function getLatestTeamRadio() {
//   return Array.from(latestTeamRadio.values());
// }

// export function getTeamRadioByDriver(driverNumber) {
//   const entry = latestTeamRadio.get(driverNumber);
//   return entry ? entry.radios : [];
// }

// export async function updateTeamRadio() {
//   printMessage('🔄 Updating team radio...');

//   const [teamRadios, teamRadioError] = await tryCatchSync(fetchTeamRadio());

//   if (teamRadioError || !Array.isArray(teamRadios)) {
//     console.error('Failed to fetch team radio:', teamRadioError?.message);
//     return;
//   }

//   for (const entry of teamRadios) {
//     const { driver_number } = entry;
//     const existing = latestTeamRadio.get(driver_number);

//     if (!existing) {
//       latestTeamRadio.set(driver_number, {
//         driver_number,
//         radios: [entry],
//       });
//     } else {
//       const isDuplicate = existing.radios.some(
//         (r) => r.recording_url === radio.recording_url
//       );

//       if (!isDuplicate) {
//         existing.radios.push(radio);
//         existing.radios.sort((a, b) => new Date(a.date) - new Date(b.date));
//       }

//       latestTeamRadio.set(driver_number, {
//         driver_number,
//         radios: existing.radios,
//       });
//     }
//   }
// }


import { fetchTeamRadio } from '../webSocket/openF1Api.mjs';
import { tryCatchSync } from '../utils/tryCatch.mjs';
import { printMessage } from '../utils/logger.mjs';

let latestTeamRadio = new Map();

export function getLatestTeamRadio() {
  return Array.from(latestTeamRadio.values());
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
      // use `entry`, not `radio`
      const isDuplicate = existing.radios.some(
        r => r.recording_url === entry.recording_url
      );

      if (!isDuplicate) {
        existing.radios.push(entry);
        existing.radios.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      }

      latestTeamRadio.set(driver_number, {
        driver_number,
        radios: existing.radios,
      });
    }
  }
}
