import axios from 'axios';

const INTERVALS_URL = 'https://api.openf1.org/v1/intervals?session_key=latest';

export async function fetchIntervals() {
  try {
    const response = await axios.get(INTERVALS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching interval data:', error.message);
    return [];
  }
}