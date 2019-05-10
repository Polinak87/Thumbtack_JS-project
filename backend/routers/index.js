'use strict';

const Router = require('koa-router');
const passport = require('../middlewares/passport');

const router = new Router();

const {
  // sequelize,
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

router.post('/api/cancelapplication', async (ctx) => {
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne(
    {
      where: { id },
    },
  );

  if (currentApplication.status === 'pending') {
    await Application.update(
      {
        status: 'canceled',
      },
      { where: { id } },
    );

    ctx.body = {
      status: 'canceled',
      message: '',
    };
    ctx.status = 200;
  } else {
    ctx.body = {
      status: currentApplication.status,
      message: 'Ops, another user has just answered on your application for exchange this thing.',
    };
    ctx.status = 200;
  }
});

router.post('/api/rejectapplication', async (ctx) => {
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne(
    {
      where: { id },
    },
  );

  if (currentApplication.status === 'pending') {
    await Application.update(
      {
        status: 'rejected',
      },
      { where: { id } },
    );

    ctx.body = {
      status: 'rejected',
      message: '',
    };
    ctx.status = 200;
  } else {
    ctx.body = {
      status: currentApplication.status,
      message: 'Ops, the other user has just canceled the application.',
    };
    ctx.status = 200;
  }
});

router.post('/api/completeapplication', async (ctx) => {
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne(
    {
      where: { id },
    },
  );

  const {
    idUserAuthor,
    idThingOffered,
    idUserAnswer,
    idThingDesired,
    status,
  } = currentApplication;

  let ApplicationsForReject;
  let ApplicationsForCancel;

  ctx.body = [];

  switch (status) {
    case 'pending':
      await Application.update(
        {
          status: 'completed',
        },
        { where: { id } },
      );

      await ctx.body.push(
        {
          id,
          status: 'completed',
          message: '',
        },
      );

      await Thing.update(
        {
          userId: idUserAnswer,
        },
        { where: { id: idThingOffered } },
      );

      await Thing.update(
        {
          userId: idUserAuthor,
        },
        { where: { id: idThingDesired } },
      );

      await Application.findAll(
        {
          where: {
            idThingOffered,
            status: 'pending',
          },
        },
      ).then((applications) => {
        ApplicationsForCancel = applications;
      });

      await Application.findAll(
        {
          where: {
            idThingDesired,
            status: 'pending',
          },
        },
      ).then((applications) => {
        ApplicationsForReject = applications;
      });

      for (let i = 0; i < ApplicationsForReject.length; i++) {
        await Application.update(
          {
            status: 'rejected',
          },
          { where: { id: ApplicationsForReject[i].dataValues.id } },
        );
        await ctx.body.push(
          {
            id: ApplicationsForReject[i].dataValues.id,
            status: 'rejected',
            message: '',
          },
        );
      }

      for (let i = 0; i < ApplicationsForCancel.length; i++) {
        await Application.update(
          {
            status: 'canceled',
          },
          { where: { id: ApplicationsForCancel[i].dataValues.id } },
        );
        if (ApplicationsForCancel[i].dataValues.idUserAnswer === ctx.state.user.id) {
          await ctx.body.push(
            {
              id: ApplicationsForCancel[i].dataValues.id,
              status: 'canceled',
              message: '',
            },
          );
        }
      }

      ctx.status = 200;
      break;

    case 'canceled':
      await ctx.body.push(
        {
          id,
          status: 'canceled',
          message: 'Very sorry, the other user has just canceled the application.',
        },
      );
      ctx.status = 200;
      break;

    case 'rejected':
      await ctx.body.push(
        {
          id,
          status: 'rejected',
          message: 'Ops, another user has just accepted your application for exchange this thing. This application is automatically canceled.',
        },
      );
      ctx.status = 200;
      break;

    default:
    {
      ctx.status = 200;
      break;
    }
  }
});

router.get('/api/applicationoutbox', async (ctx, next) => {
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

router.post('/api/applicationoutboxfiltered', async (ctx, next) => {
  const currentUserId = ctx.state.user.id;
  const statusForFilter = ctx.request.body.params.status;

  console.log(statusForFilter);

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
      status: statusForFilter,
    },
  });
  ctx.status = 200;
});

router.get('/api/applicationinbox', async (ctx, next) => {
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
      idUserAnswer: currentUserId,
    },
  });
  ctx.status = 200;
});

router.post('/api/applicationinboxfiltered', async (ctx, next) => {
  const currentUserId = ctx.state.user.id;
  const statusForFilter = ctx.request.body.params.status;

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
      idUserAnswer: currentUserId,
      status: statusForFilter,
    },
  });
  ctx.status = 200;
});

// sequelize.sync({ force: true }).then(async () => {
//   await Category.create({ name: 'dresses' });
//   await Category.create({ name: 'skirts' });
//   await Category.create({ name: 'blouses' });
//   await User.create({
//     firstName: 'Polina',
//     lastName: 'Kozlova',
//     email: 'polinacheez@gmail.com',
//     password: 'ggg',
//   });
//   await User.create({
//     firstName: 'Anna',
//     lastName: 'Mitrofanova',
//     email: 'mitroshka@mail.com',
//     password: 'ggg',
//   });
//   await Thing.create({
//     name: 'summer dress',
//     description: 'pretty',
//     categoryId: '1',
//     userId: '1',
//     onMarket: false,
//     onMarketAt: null,
//   });
//   await Thing.create({
//     name: 'summer dress',
//     description: 'light',
//     categoryId: '1',
//     userId: '2',
//     onMarket: false,
//     onMarketAt: null,
//   });
//   await Application.create({
//     idApplicationOutbox: 1,
//     idUserAuthor: 1,
//     idThingOffered: 1,
//     idApplicationInbox: 1,
//     idUserAnswer: 2,
//     idThingDesired: 2,
//     status: 'pending',
//   });
// });

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
      console.log(ctx.body);
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
  ctx.status = 200;
  // return ctx.redirect('/home');
});

module.exports = {
  router,
};
