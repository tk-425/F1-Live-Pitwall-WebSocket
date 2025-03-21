import axios from 'axios';

const INTERVALS_URL = 'https://api.openf1.org/v1/intervals?session_key=latest';
const POSITIONS_URL = 'https://api.openf1.org/v1/position?session_key=latest';
const MAX_RETRIES = 3;

// Fetch the latest data with retry logic
async function fetchWithRetry(url, retries = MAX_RETRIES) {
  while (retries > 0) {
    try {
      const response = await axios.get(url, {
        params: {
          session_key: 'latest',
        },
      });

      if (response.status === 200) {
        return response.data;
      }

      throw new Error(`API returned status ${response.status}`);
    } catch (err) {
      console.error(
        `Error fetching ${url}: ${err.message}. Retries left: ${retries - 1}`
      );
      retries--;

      if (retries === 0) {
        console.error(`Max retries reached. Failed to fetch ${url}`);
        return [];
      }

      // Wait before retrying
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}

export async function fetchIntervals() {
  return fetchWithRetry(INTERVALS_URL);
}

export async function fetchPositions() {
  return fetchWithRetry(POSITIONS_URL);
}
