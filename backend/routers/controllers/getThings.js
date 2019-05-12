'use strict';

const {
  User,
  Thing,
  Category,
} = require('../../models');

const getUserThings = async (ctx, next) => {
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
};

const getMarketThings = async (ctx, next) => {
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
};

module.exports = {
  getUserThings,
  getMarketThings,
};
