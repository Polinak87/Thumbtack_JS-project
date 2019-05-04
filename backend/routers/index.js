'use strict';

const Router = require('koa-router');
const passport = require('../middlewares/passport');

const router = new Router();

const {
  sequelize,
  Thing,
  User,
  Category,
  Application,
} = require('../models');

router.get('/api/userthings', async (ctx, next) => {
  const currentUserId = ctx.state.user.id;

  ctx.body = await Thing.findAll({
    include: [{
      model: Category,
    }],
    where: {
      userId: currentUserId,
    },
  });
  ctx.status = 200;
});

router.get('/api/marketthings', async (ctx, next) => {
  ctx.body = await Thing.findAll({
    include: [{
      model: User,
    }, {
      model: Category,
    }],
    where: {
      onMarket: true,
    },
  });
  ctx.status = 200;
});

router.get('/api/category', async (ctx, next) => {
  ctx.body = await Category.findAll();
  ctx.status = 200;
});

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
  ctx.status = 200;
});

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
  ctx.status = 200;
});

router.post('/api/removethingfrommarket', async (ctx) => {
  const thingId = ctx.request.body.id;

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
  ctx.status = 200;
});

router.post('/api/createapplication', async (ctx) => {
  const { idThingOffered, idThingDesired, idUserAnswer } = ctx.request.body;
  const idUserAuthor = ctx.state.user.id;

  await Application.create({
    idUserAuthor,
    idThingOffered,
    idUserAnswer,
    idThingDesired,
    status: 'pending',
  });
  ctx.body = 'Application is created.';
  ctx.status = 200;
});

router.get('/api/applicationOutbox', async (ctx, next) => {
  const currentUserId = ctx.state.user.id;

  ctx.body = await Application.findAll({
    include: [{
      model: Thing,
      as: 'ThingOffered',
      include: [{
        model: Category,
      }],
    }, {
      model: Thing,
      as: 'ThingDesired',
      include: [{
        model: Category,
      }],
    }],
    where: {
      idUserAuthor: currentUserId,
    },
  });
  ctx.status = 200;
});

router.get('/api/applicationInbox', async (ctx, next) => {
  const currentUserId = ctx.state.user.id;

  ctx.body = await Application.findAll({
    include: [{
      model: Thing,
      as: 'ThingOffered',
    }, {
      model: Thing,
      as: 'ThingDesired',
    }],
    where: {
      idUserAnswer: currentUserId,
    },
  });
  ctx.status = 200;
});

sequelize.sync({ force: false }).then(async () => {
  await Category.create({ name: 'dresses' });
  await Category.create({ name: 'skirts' });
  await Category.create({ name: 'blouses' });
  await User.create({
    firstName: 'Polina',
    lastName: 'Kozlova',
    email: 'polinacheez@gmail.com',
    password: 'ggg',
  });
  await User.create({
    firstName: 'Anna',
    lastName: 'Mitrofanova',
    email: 'mitroshka@mail.com',
    password: 'ggg',
  });
  await Thing.create({
    name: 'summer dress',
    description: 'pretty',
    categoryId: '1',
    userId: '1',
    onMarket: false,
    onMarketAt: null,
  });
  await Thing.create({
    name: 'summer dress',
    description: 'light',
    categoryId: '1',
    userId: '2',
    onMarket: false,
    onMarketAt: null,
  });
  await Application.create({
    idApplicationOutbox: 1,
    idUserAuthor: 1,
    idThingOffered: 1,
    idApplicationInbox: 1,
    idUserAnswer: 2,
    idThingDesired: 2,
    status: 'pending',
  });
});

// eslint-disable-next-line consistent-return
router.post('/api/registration', async (ctx) => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/profile');
  }
  const { email } = ctx.request.body;
  const userFromDB = await User.findOne({ where: { email } });

  if (!userFromDB) {
    await User.create(ctx.request.body);

    await passport.authenticate('local', {}, async (err, newUser) => {
      ctx.login(newUser, (err) => {
        if (err) {
          ctx.throw(401, err.message);
        }
        ctx.status = 200;
        ctx.body = newUser;
      });
    })(ctx);
  } else {
    ctx.throw(401, 'This email has been used for registration. Please use another email.');
  }
});

// eslint-disable-next-line consistent-return
router.post('/api/login', async (ctx) => {
  if (ctx.isAuthenticated()) {
    return ctx.redirect('/profile');
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

  return ctx.redirect('/home');
});

module.exports = {
  router,
};
