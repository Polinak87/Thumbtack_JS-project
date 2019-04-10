'use strict';

const PORT = 3000;

const Koa = require('koa');
const serve = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
const bunyan = require('bunyan');
const koaLogger = require('koa-bunyan');

const port = process.env.PORT || PORT;

const app = new Koa();
const router = new Router();
const logger = bunyan.createLogger({ name: 'app' });

const {
  // sequelize,
  Thing,
} = require('./models');

// работает
router.post('/api/addthink', koaBody(), (ctx) => {
  Thing.create(ctx.request.body);
  ctx.body = 'Thing is added.';
});
// работает
router.get('/api/things', async (ctx, next) => {
  ctx.body = await Thing.findAll();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.context.log = logger;

app.use(koaLogger(logger));

app.use(serve('public'));

app.listen(port, () => {
  logger.info(`Server is started on ${port} port`);
});

// sequelize.sync({ force: true }).then(async () => {
//   await Thing.create({
//     name: 'dress',
//     description: 'pretty',
//     category: 'clothes',
//   });

//   const thing = await Thing.findOne({
//     where: {
//       id: 1,
//     }
//   });
// });

