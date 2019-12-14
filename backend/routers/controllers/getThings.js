'use strict';

const urlapi = require('url');
const {
  User,
  Thing,
  UserThing,
  Category,
} = require('../../models');

const getUserThings = async (ctx, next) => {
  const currentUserId = ctx.state.user.id;

  ctx.body = await UserThing.findAll({
    include: [{
      model: Thing,
      include: [{
        model: Category,
      }],
    }],
    where: {
      userId: currentUserId,
    },
  });
  ctx.status = 200;
};

const getMarketThings = async (ctx, next) => {
  const query = urlapi.parse(ctx.request.url).query;
  const categoryForFiltration = query.substring((query.indexOf('=') + 1), query.indexOf('&'));
  const sortingType = query.substring((query.lastIndexOf('=') + 1), query.length);

  if (!categoryForFiltration.localeCompare('all')) {
    ctx.body = await UserThing.findAll({
      include: [{
        model: Thing,
        include: [{
          model: Category,
        }],
      }, {
        model: User,
      }],
      where: {
        onMarket: true,
      },
      order: [
        ['created_at', sortingType],
      ],
    });
    ctx.status = 200;
  } else {
    ctx.body = await UserThing.findAll({
      include: [{
        model: Thing,
        where: {
          categoryId: categoryForFiltration,
        },
        include: [{
          model: Category,
        }],
      }, {
        model: User,
      }],
      where: {
        onMarket: true,
      },
      order: [
        ['created_at', sortingType],
      ],
    });
    ctx.status = 200;
  }
};

const getMarketThingsOfOneUser = async (ctx, next) => {
  const query = urlapi.parse(ctx.request.url).query;
  const userForFiltration = query.substring((query.indexOf('=') + 1), query.length);

  ctx.body = await UserThing.findAll({
    include: [{
      model: Thing,
      include: [{
        model: Category,
      }],
    }, {
      model: User,
      where: {
        id: userForFiltration,
      },
    }],
    where: {
      onMarket: true,
    },
  });
  ctx.status = 200;
};

const getCatalogThings = async (ctx, next) => {
  ctx.body = await Thing.findAll({
    include: [{
      model: Category,
    }],
  });
  ctx.status = 200;
};

module.exports = {
  getUserThings,
  getMarketThings,
  getMarketThingsOfOneUser,
  getCatalogThings,
};
