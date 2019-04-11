'use strict';

const PORT = 3000;

const Koa = require('koa');
const serve = require('koa-static');
const bunyan = require('bunyan');
const koaLogger = require('koa-bunyan');
const koaBody = require('koa-body');
const session = require('koa-generic-session');
const SequelizeSessionStore = require('koa-generic-session-sequelize'); // прочитала
const { sequelize } = require('./models');
const { router } = require('./routers/index');
const passport = require('./middlewares/passport');

const port = process.env.PORT || PORT;
const app = new Koa();
const logger = bunyan.createLogger({ name: 'app' });

app.context.log = logger;
app.use(koaLogger(logger));
app.use(serve('public'));

app.use(koaBody());
app.keys = ['secret'];

// sequelize.sync({ force: true }).then(async () => {
// // session middleware allows using ctx.session to set or get the sessions
app.use(session({
  store: new SequelizeSessionStore(
    sequelize, {
      tableName: 'sessions',
    },
  ),
}));

app.use(passport.initialize());
app.use(passport.session());
//   app.use(router.routes());
//   app.use(router.allowedMethods());

//   app.listen(port, () => {
//     console.log(`Server is started on ${port} port`);
//   });
// });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is started on ${port} port`);
});

