'use strict';

const Router = require('koa-router');
const passport = require('../middlewares/passport');

const router = new Router();

const {
  sequelize,
  Thing,
  User,
  Category,
} = require('../models');

router.post('/api/addthingtomarket', async (ctx) => {
  const thingId = ctx.request.body.id;

  console.log(thingId);

  await Thing.update(
    { onMarket: true },
    { where: { id: thingId } },
  );
  ctx.body = { onMarket: true };
});

router.post('/api/removethingfrommarket', async (ctx) => {
  const thingId = ctx.request.body.id;

  console.log(thingId);

  await Thing.update(
    { onMarket: false },
    { where: { id: thingId } },
  );
  ctx.body = { onMarket: false };
});

// работает
router.post('/api/addnewthing', async (ctx) => {
  const { name, description, category } = ctx.request.body;
  const userId = ctx.state.user.id;

  await Thing.create({
    name,
    description,
    category,
    userId,
  });
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
  ctx.body = await Thing.findAll({
    include: [{
      model: User,
      attributes: [],
      where: {},
    }],
  });
  console.log(ctx.body);
});

router.get('/api/userthings', async (ctx, next) => {
  const userId = ctx.state.user.id;

  ctx.body = await Thing.findAll({ where: { userId } });
  // console.log(ctx.body);
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

router.get('/api/category', async (ctx, next) => {
  ctx.body = await Category.findAll();
  // console.log(ctx.body);
});

// sequelize.sync({ force: true }).then(async () => {
//   const user = await User.create({
//     firstName: 'Ivan',
//     lastName: 'Ivan',
//     email: 'Ivan',
//     password: 'Ivanov',
//   });
// });

sequelize.sync({ force: false }).then(async () => {
  const thing = await Thing.create({
    name: 'summer dress',
    description: 'pretty',
    category: '1',
    userId: '1',
    onMarket: true,
  });
});

sequelize.sync({ force: false })
  .then(async () => {
    await Category.create({ name: 'dresses' });
    await Category.create({ name: 'skirts' });
    await Category.create({ name: 'blouses' });
  });

module.exports = {
  router,
};

