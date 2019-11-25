'use strict';

const {
  User,
  Thing,
  UserThing,
  Category,
} = require('../../models');

// const getUserThings = async (ctx, next) => {
//   const currentUserId = ctx.state.user.id;

//   ctx.body = await Thing.findAll({
//     include: [{
//       model: UserThing,
//       // as: 'baseThing',
//       where: {
//         userId: currentUserId,
//       },
//     }, {
//       model: Category,
//     }],
//   });
//   console.log(ctx.body[0]);
//   ctx.status = 200;
// };

const getUserThings = async (ctx, next) => {
  const currentUserId = ctx.state.user.id;

  ctx.body = await UserThing.findAll({
    include: [{
      model: Thing,
      // as: 'baseThing',
      include: [{
        model: Category,
      }],
    }],
    where: {
      userId: currentUserId,
    },
  });
  console.log(JSON.stringify(ctx.body));
  ctx.status = 200;
};

// User.findAll({
//   include: [{
//     model: Project,
//     through: {
//       attributes: ['createdAt', 'startedAt', 'finishedAt'],
//       where: {completed: true}
//     }
//   }]
// });

const getMarketThings = async (ctx, next) => {
  ctx.body = await UserThing.findAll({
    include: [{
      model: Thing,
      // as: 'baseThing',
      include: [{
        model: Category,
      }],
    }, {
      model: User,
    }],
    where: {
      onMarket: true,
    },
  });
  console.log(JSON.stringify(ctx.body[0]));
  ctx.status = 200;
};

module.exports = {
  getUserThings,
  getMarketThings,
};
