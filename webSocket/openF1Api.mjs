import { envConfig } from '../utils/dotenv.config.js';
import axios from 'axios';
import { URLS } from '../utils/urls.js';
import { tryCatchSync } from '../utils/tryCatch.js';
import { printError } from '../utils/logger.js';

const MAX_RETRIES = envConfig.MAX_RETRIES || 5;

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  while (retries > 0) {
    const [response, error] = await tryCatchSync(axios.get(url));

    if (response?.status === 200) {
      return response.data;
    }

    if (error) {
      printError(
        `Error fetching ${url}: ${error.message}. Retries left: ${retries - 1}`
      );
    } else {
      printError(
        `Unexpected response from ${url}: ${response?.status}. Retries left: ${
          retries - 1
        }`
      );
    }

    retries--;

    if (retries === 0) {
      printError(`Max retries reached. Failed to fetch ${url}`);
      return [];
    }

    // Wait 4 second and try again
    await new Promise((res) => setTimeout(res, 4000));
  }
}

export async function fetchMeeting() {
  return await fetchWithRetry(URLS.MEETING);
}

export async function fetchSession() {
  return await fetchWithRetry(URLS.SESSION);
}

export async function fetchIntervals() {
  return await fetchWithRetry(URLS.INTERVALS);
}

export async function fetchPositions() {
  return await fetchWithRetry(URLS.POSITIONS);
}

export async function fetchStints() {
  return await fetchWithRetry(URLS.STINTS);
}

export async function fetchTeamRadio() {
  return await fetchWithRetry(URLS.TEAM_RADIO);
}
