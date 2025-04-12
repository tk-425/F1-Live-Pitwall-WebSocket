import { envConfig } from './dotenv.config.js';
import { schedule_2025 } from '../info/info_schedule2025.js';

const BASE_URL = envConfig.API_URL;

const INTERVALS = `${BASE_URL}/intervals?session_key=latest`;
const POSITIONS = `${BASE_URL}/position?session_key=latest`;
const SESSION = `${BASE_URL}/sessions?session_key=latest`;
const STINTS = `${BASE_URL}/stints?session_key=latest`;
const TEAM_RADIO = `${BASE_URL}/team_radio?session_key=latest`;
const MEETING = `${BASE_URL}/meetings?meeting_key=latest`;
const SCHEDULE = schedule_2025;

export const URLS = {
  INTERVALS,
  POSITIONS,
  SESSION,
  STINTS,
  TEAM_RADIO,
  MEETING,
  SCHEDULE,
};