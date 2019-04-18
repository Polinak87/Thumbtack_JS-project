'use strict';

const Router = require('koa-router');
const passport = require('../middlewares/passport');

const router = new Router();

const {
  // sequelize,
  Thing,
  User,
} = require('../models');

// работает
router.post('/api/addnewthing', (ctx) => {
  Thing.create(ctx.request.body);
  // console.log(ctx.request.body);
  ctx.body = 'Thing is added.';
});

// eslint-disable-next-line consistent-return
router.post('/api/registration', async (ctx) => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/');
  }
  const { email } = ctx.request.body;
  const userFromDB = await User.findOne({ where: { email } });

  if (!userFromDB) {
    await User.create(ctx.request.body);

    await passport.authenticate('local', {}, async (err, newUser) => {
      // console.log('4');
      ctx.login(newUser, (err) => {
        // console.log('5');
        if (err) {
          ctx.throw(401, err.message);
        }
        ctx.status = 200;
        ctx.body = newUser;
      });
    })(ctx);
    // ctx.body = 'User is added.';
  } else {
    ctx.throw(401, 'This email has been used for registration. Please use another email.');
  }
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
  // console.log('0');
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/');
  }

  await passport.authenticate('local', {}, async (err, user) => {
    // console.log('4');
    if (!user) {
      ctx.throw(401, 'Incorrect login/password');
    }

    ctx.login(user, (err) => {
      // console.log('5');
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

// sequelize.sync({ force: true }).then(async () => {
//   const user = await User.create({
//     firstName: 'Ivan',
//     lastName: 'Ivan',
//     email: 'Ivan',
//     password: 'Ivanov',
//   });
// });

module.exports = {
  router,
};

