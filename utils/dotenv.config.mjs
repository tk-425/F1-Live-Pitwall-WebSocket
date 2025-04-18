import dotenv from 'dotenv';
import { envPath } from './envPath.mjs';
import { printError } from './logger.mjs';

const result = dotenv.config({ path: envPath.path });

if (result.error) {
  printError('❌ Error loading .env:', result.error);
}

export const envConfig = process.env;
