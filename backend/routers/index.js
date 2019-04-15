'use strict';

const Router = require('koa-router');
const passport = require('../middlewares/passport');

const router = new Router();

const {
  // sequelize,
  Thing,
} = require('../models');

// работает
router.post('/api/addnewthing', (ctx) => {
  Thing.create(ctx.request.body);
  console.log(ctx.request.body);
  ctx.body = 'Thing is added.';
});
// работает
router.get('/api/things', async (ctx, next) => {
  ctx.body = await Thing.findAll();
});
// тестим
router.get('/api/me', (ctx) => {
  if (ctx.isUnauthenticated()) {
    ctx.throw(401, 'Unauthenticated');
  }
  ctx.status = 200;
  ctx.body = ctx.state.user;
});

// eslint-disable-next-line consistent-return
router.post('/api/login', async (ctx) => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/');
  }

  await passport.authenticate('local', {}, async (err, user) => {
    if (!user) {
      ctx.throw(401, 'Incorrect login/password');
    }

    ctx.login(user, (err) => {
      if (err) {
        ctx.throw(401, err.message);
      }
      ctx.status = 200;
      ctx.body = user;
    });
  })(ctx);
});

router.post('/api/logout', async (ctx) => {
  await ctx.logout();
  // ctx.state.user

  return ctx.redirect('/');
});

module.exports = {
  router,
};

