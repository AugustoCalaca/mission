import 'isomorphic-fetch';
import { createServer } from 'http';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa-cors';
import koaLogger from 'koa-logger';

import { router } from './routes';

const app = new Koa();

if (process.env.NODE_ENV === 'production') {
  app.proxy = true;
}

app.use(bodyParser());
app.use(convert(cors({ maxAge: 86400, origin: '*' })));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('[ERROR] - Koa error:', err);
    ctx.status = err.status || 500;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.error('[ERROR] - Error while answering request', { error: err });
});

if (process.env.NODE_ENV !== 'test') {
  app.use(koaLogger());
}

app.use(router.routes());
app.use(router.allowedMethods());

// Default not found 404
app.use((ctx) => {
  ctx.status = 404;
});

const server = createServer(app.callback());
export default server;
