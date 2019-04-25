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
  const date = new Date();

  await Thing.update(
    {
      onMarket: true,
      onMarketAt: date,
    },
    { where: { id: thingId } },
  );
  ctx.body = {
    onMarket: true,
    onMarketAt: date,
  };
});

router.post('/api/removethingfrommarket', async (ctx) => {
  const thingId = ctx.request.body.id;
  // console.log(thingId);

  await Thing.update(
    {
      onMarket: false,
      onMarketAt: null,
    },
    { where: { id: thingId } },
  );
  ctx.body = {
    onMarket: false,
    onMarketAt: null,
  };
});

// работает
router.post('/api/addnewthing', async (ctx) => {
  const { name, description, categoryId } = ctx.request.body;
  const userId = ctx.state.user.id;

  await Thing.create({
    name,
    description,
    categoryId,
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
    where: {
      onMarket: true,
    },
  });
  // console.log(ctx.body);
});

router.get('/api/userthings', async (ctx, next) => {
  // const currentUserId = ctx.state.user.id;// !!!!
  console.log(ctx.state);
  ctx.body = await Thing.findAll({
    include: [{
      model: Category,
      // as: 'category',
      // attributes: [],
      where: {},
    }],
    where: {
      userId: 1,
    },
  // console.log(ctx.body);
  });
});

// const myThings = await Thing.findAll({
//   include: [{
//     model: User,
//     attributes: [],
//     where: {
//       Id: user.id,
//     },
//     through: {
//       where: {
//         for_exchange: true,
//       },
//     },
//   }],
// });

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

// sequelize.sync({ force: true }).then(async () => {
//   const thing = await Thing.create({
//     name: 'summer dress',
//     description: 'pretty',
//     categoryId: '1',
//     userId: '1',
//     onMarket: true,
//     onMarketAt: new Date(),
//   });
// });

sequelize.sync({ force: false })
  .then(async () => {
    await Category.create({ name: 'dresses' });
    await Category.create({ name: 'skirts' });
    await Category.create({ name: 'blouses' });
  });

module.exports = {
  router,
};
