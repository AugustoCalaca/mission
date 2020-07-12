import axios from 'axios';

import { API_ENDPOINT } from '../settings';

export const api = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});
