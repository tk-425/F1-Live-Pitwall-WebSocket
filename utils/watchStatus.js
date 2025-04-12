import { printWarning } from './logger.js';

export function watchStatus(interval, data, type, updateCallback) {
  setInterval(async () => {
    const now = new Date();

    if (!data || new Date(data.date_end) <= now) {
      printWarning(
        `${toCapitalize(type)} expired, checking for new ${type}...`
      );
      await updateCallback();
    } else {
      printWarning(`${toCapitalize(type)} still active, no update needed.`);
    }
  }, interval);
}

function toCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
