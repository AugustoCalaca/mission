import mongoose from 'mongoose';

import { MONGO_URI } from './config';

export function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', (error) => {
        // eslint-disable-next-line no-console
        console.log('[MONGOOSE] - Connection failed');
        reject(error);
      })
      .on('close', () => {
        // eslint-disable-next-line no-console
        console.log('[MONGOOSE] - Connection closed');
        process.exit(1);
      })
      .once('open', () => {
        const infos = mongoose.connections;
        // eslint-disable-next-line no-console
        infos.map((info) => console.log(`[\\o/] - Connected on ${info.host}:${info.port}/${info.name}`));
        resolve(infos[0]);
      });

    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });
}
