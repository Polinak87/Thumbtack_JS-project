'use strict';

const {
  User,
  Thing,
  UserThing,
  Category,
} = require('../../models');

const { checkAuthentication } = require('./authorization');

const getInventoryThings = async (ctx, next) => {
  await checkAuthentication(ctx);

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
  await checkAuthentication(ctx);
  const query = ctx.request.querystring;
  const params = new URLSearchParams(query);
  const categoryForFiltration = params.get('filtrationType');
  const sortingType = params.get('sortingType');

  if (categoryForFiltration === 'all') {
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
  await checkAuthentication(ctx);
  const query = ctx.request.querystring;
  const params = new URLSearchParams(query);
  const userForFiltration = params.get('user');

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
  await checkAuthentication(ctx);
  ctx.body = await Thing.findAll({
    include: [{
      model: Category,
    }],
  });
  ctx.status = 200;
};

module.exports = {
  getInventoryThings,
  getMarketThings,
  getMarketThingsOfOneUser,
  getCatalogThings,
};
