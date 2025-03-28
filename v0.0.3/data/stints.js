import { fetchStints } from '../webSocket/openf1Api.js';
import { tryCatchSync } from '../utils/tryCatch.js';

let latestStints = new Map();

export function getLatestStints() {
  return Array.from(latestStints.values());
}

// Dummy Stints
// export function getLatestStints() {
//   return [
//     {
//       driver_number: 5,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 5,
//           lap_start: 1,
//           lap_end: 1,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 5,
//           lap_start: 2,
//           lap_end: 26,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 3,
//           driver_number: 5,
//           lap_start: 27,
//           lap_end: 56,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     {
//       driver_number: 14,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 14,
//           lap_start: 1,
//           lap_end: 5,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 5,
//         },
//       ],
//     },
//     {
//       driver_number: 10,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 10,
//           lap_start: 1,
//           lap_end: 10,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 10,
//           lap_start: 11,
//           lap_end: 57,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     //
//     {
//       driver_number: 81,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 5,
//           lap_start: 1,
//           lap_end: 1,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 5,
//           lap_start: 2,
//           lap_end: 26,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 3,
//           driver_number: 5,
//           lap_start: 27,
//           lap_end: 56,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     {
//       driver_number: 4,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 14,
//           lap_start: 1,
//           lap_end: 5,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 5,
//         },
//       ],
//     },
//     {
//       driver_number: 63,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 10,
//           lap_start: 1,
//           lap_end: 10,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 10,
//           lap_start: 11,
//           lap_end: 57,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     //
//     {
//       driver_number: 1,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 5,
//           lap_start: 1,
//           lap_end: 1,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 5,
//           lap_start: 2,
//           lap_end: 26,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 3,
//           driver_number: 5,
//           lap_start: 27,
//           lap_end: 56,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     {
//       driver_number: 16,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 14,
//           lap_start: 1,
//           lap_end: 5,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 5,
//         },
//       ],
//     },
//     {
//       driver_number: 44,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 10,
//           lap_start: 1,
//           lap_end: 10,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 10,
//           lap_start: 11,
//           lap_end: 57,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     //
//     {
//       driver_number: 31,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 5,
//           lap_start: 1,
//           lap_end: 1,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 5,
//           lap_start: 2,
//           lap_end: 26,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 3,
//           driver_number: 5,
//           lap_start: 27,
//           lap_end: 56,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     {
//       driver_number: 12,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 14,
//           lap_start: 1,
//           lap_end: 5,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 5,
//         },
//       ],
//     },
//     {
//       driver_number: 23,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 10,
//           lap_start: 1,
//           lap_end: 10,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 10,
//           lap_start: 11,
//           lap_end: 57,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     //
//     {
//       driver_number: 87,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 5,
//           lap_start: 1,
//           lap_end: 1,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 5,
//           lap_start: 2,
//           lap_end: 26,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 3,
//           driver_number: 5,
//           lap_start: 27,
//           lap_end: 56,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     {
//       driver_number: 18,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 14,
//           lap_start: 1,
//           lap_end: 5,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 5,
//         },
//       ],
//     },
//     {
//       driver_number: 55,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 10,
//           lap_start: 1,
//           lap_end: 10,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 10,
//           lap_start: 11,
//           lap_end: 57,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     //
//     {
//       driver_number: 6,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 5,
//           lap_start: 1,
//           lap_end: 1,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 5,
//           lap_start: 2,
//           lap_end: 26,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 3,
//           driver_number: 5,
//           lap_start: 27,
//           lap_end: 56,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     {
//       driver_number: 30,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 14,
//           lap_start: 1,
//           lap_end: 5,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 5,
//         },
//       ],
//     },
//     {
//       driver_number: 7,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 10,
//           lap_start: 1,
//           lap_end: 10,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 10,
//           lap_start: 11,
//           lap_end: 57,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     //
//     {
//       driver_number: 27,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 5,
//           lap_start: 1,
//           lap_end: 1,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 2,
//           driver_number: 5,
//           lap_start: 2,
//           lap_end: 26,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 3,
//           driver_number: 5,
//           lap_start: 27,
//           lap_end: 56,
//           compound: 'HARD',
//           tyre_age_at_start: 0,
//         },
//       ],
//     },
//     {
//       driver_number: 22,
//       lastUpdated: 1711478000000,
//       stints: [
//         {
//           meeting_key: 1255,
//           session_key: 9998,
//           stint_number: 1,
//           driver_number: 14,
//           lap_start: 1,
//           lap_end: 5,
//           compound: 'MEDIUM',
//           tyre_age_at_start: 5,
//         },
//       ],
//     },
//   ];
// }

export function getStintsByDriverNumber(driverNumber) {
  const driverData = latestStints.get(driverNumber);
  return driverData ? driverData.stints : [];
}

export async function updateStints() {
  const [stints, stintsError] = await tryCatchSync(fetchStints());

  if (stintsError || !Array.isArray(stints)) {
    console.error('Failed to fetch stints:', stintsError?.message);
    return;
  }

  for (const entry of stints) {
    const { driver_number, stint_number } = entry;
    const existing = latestStints.get(driver_number);

    if (!existing) {
      latestStints.set(driver_number, {
        driver_number,
        lastUpdated: Date.now(),
        stints: [entry],
      });
    } else {
      const hasStint = existing.stints.some(
        (s) => s.stint_number === stint_number
      );

      if (!hasStint) {
        existing.stints.push(entry);
        existing.stints.sort((a, b) => a.stint_number - b.stint_number);
      }

      latestStints.set(driver_number, {
        driver_number,
        lastUpdated: Date.now(),
        stints: existing.stints,
      });
    }
  }
}
