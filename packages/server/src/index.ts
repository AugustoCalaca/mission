import 'core-js';
import { API_PORT } from './common/config';
import { connectDatabase } from './common/database';

import server from './app';

const runServer = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('[WAIT] - Connecting to database...');
    await connectDatabase();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[ERROR] - Could not connect to database', { error });
    throw error;
  }

  server.listen(API_PORT, () => {
    // eslint-disable-next-line no-console
    console.info(`[\\o/] - Server started on port: ${API_PORT}`);

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.info(`[INFO] - Api available localhost:${API_PORT}`);
    }
  });
};

(async () => {
  // eslint-disable-next-line no-console
  console.log('[WAIT] - Server starting...');
  await runServer();
})();
