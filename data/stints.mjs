import { checkError } from '../utils/checkArrayError.mjs';
import { printMessage } from '../utils/logger.mjs';
import { SendDataType } from '../utils/sendDataType.mjs';
import { tryCatchSync } from '../utils/tryCatch.mjs';
import { fetchStints } from '../webSocket/openF1Api.mjs';

let latestStints = new Map();

export function getLatestStints() {
  return Array.from(latestStints.values());
}

export async function updateStints() {
  printMessage('🔄 Updating stints...');

  const [stints, stintsError] = await tryCatchSync(fetchStints());

  checkError(stints, stintsError, SendDataType.STINTS);

  for (const entry of stints) {
    const { driver_number, stint_number } = entry;
    const existing = latestStints.get(driver_number);

    if (!existing) {
      latestStints.set(
        driver_number,
        createDriverStintData(driver_number, [entry])
      );
    } else {
      const hasStint = existing.stints.some(
        (s) => s.stint_number === stint_number
      );

      if (!hasStint) {
        existing.stints.push(entry);
        existing.stints.sort((a, b) => a.stint_number - b.stint_number);
      }

      latestStints.set(
        driver_number,
        createDriverStintData(driver_number, existing.stints)
      );
    }
  }
}

export function getStintsByDriverNumber(driverNumber) {
  const driverData = latestStints.get(driverNumber);
  return driverData ? driverData.stints : [];
}

function createDriverStintData(driverNumber, stints = []) {
  return {
    driver_number: driverNumber,
    lastUpdated: Date.now(),
    stints,
  };
}
