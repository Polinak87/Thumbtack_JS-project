'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const bunyan = require('bunyan');
const koaLogger = require('koa-bunyan');
const koaBody = require('koa-body');
const session = require('koa-generic-session');
const SequelizeSessionStore = require('koa-generic-session-sequelize');
const send = require('koa-send');
const path = require('path');
const { sequelize } = require('./models');
const { router } = require('./routers/index');
const passport = require('./middlewares/passport');

const app = new Koa();
const logger = bunyan.createLogger({ name: 'app' });

app.context.log = logger;
app.use(koaLogger(logger));
app.use(serve('public'));

app.use(koaBody());
app.keys = ['secret'];

app.use(session({
  store: new SequelizeSessionStore(
    sequelize, {
      tableName: 'sessions',
    },
  ),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => {
  if (!ctx.request.path.startsWith('/api/')) {
    const _path = path.resolve('public');

    await send(ctx, 'index.html', { root: _path });
  }
});

module.exports = {
  app,
};
