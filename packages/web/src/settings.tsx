export const ENV = (process.env.REACT_ENV || 'production').trim();
export const IS_DEVELOPMENT = ENV === 'development';

export const API_ENDPOINT = (process.env.REACT_API_ENDPOINT || '').trim();

if (!API_ENDPOINT) throw new Error('Please provide an API_ENDPOINT');
