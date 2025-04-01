import dotenv from 'dotenv';
import { envPath } from '../utils/envPath.js';

dotenv.config(envPath);

console.log('UPDATE_INTERVAL:', process.env.UPDATE_INTERVAL);
