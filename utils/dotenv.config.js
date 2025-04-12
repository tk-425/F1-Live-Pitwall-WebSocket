import dotenv from 'dotenv';
import { envPath } from './envPath.js';
import { printError } from './logger.js';

const result = dotenv.config({ path: envPath.path });

if (result.error) {
  printError('❌ Error loading .env:', result.error);
}

export const envConfig = process.env;
