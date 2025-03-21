import axios from 'axios';
import dotenv from 'dotenv';
import { tryCatch } from '../utils/tryCatch.js';

dotenv.config();

const INTERVALS_URL = 'https://api.openf1.org/v1/intervals?session_key=latest';
const POSITIONS_URL = 'https://api.openf1.org/v1/position?session_key=latest';
const MAX_RETRIES = process.env.MAX_RETRIES || 3;

// Fetch the latest data with retry logic
async function fetchWithRetry(url, retries = MAX_RETRIES) {
  while (retries > 0) {
    const [response, error] = await tryCatch(
      axios.get(url, {
        params: {
          session_key: 'latest',
        },
      })
    );

    if (response?.status === 200) {
      return response.data;
    }

    if (error) {
      console.error(
        `Error fetching ${url}: ${error.message}. Retries left: ${retries - 1}`
      );
    } else {
      console.error(
        `Unexpected response from ${url}: ${response?.status}. Retries left: ${
          retries - 1
        }`
      );
    }

    retries--;

    if (retries === 0) {
      console.error(`Max retries reached. Failed to fetch ${url}`);
      return [];
    }

    // Wait 1 second and try again
    await new Promise((res) => setTimeout(res, 1000));
  }
}

export async function fetchIntervals() {
  return fetchWithRetry(INTERVALS_URL);
}

export async function fetchPositions() {
  return fetchWithRetry(POSITIONS_URL);
}
