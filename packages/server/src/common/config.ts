import path from 'path';

import dotenvSafe from 'dotenv-safe';
import envVar from 'env-var';

const cwd = process.cwd();

const root = path.join.bind(cwd);
dotenvSafe.config({
  // allowEmptyValues: process.env.NODE_ENV !== 'production',
  allowEmptyValues: true,
  path: root('.env'),
  example: root('.env.example'),
});

// Display a friendly message on console to indicate if we're are running in a production or development environment
const status = process.env.NODE_ENV === 'production' ? 'production' : 'development';

// don't console.log on test env to not disturb console output
if (process.env.NODE_ENV && process.env.NODE_ENV !== 'test') {
  // eslint-disable-next-line
  console.log(`CONFIG: NODE_ENV: '${process.env.NODE_ENV}' running in: '${status}'`);
}

// Export some settings that should always be defined
export const MONGO_URI = envVar.get('MONGO_URI').required().asString();

// Ports
export const API_PORT = envVar.get('API_PORT').default('4040').required().asPortNumber();
