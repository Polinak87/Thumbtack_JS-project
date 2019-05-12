'use strict';

const { Thing } = require('../../models');

const addNewThing = async (ctx) => {
  const { name, description, categoryId } = ctx.request.body;
  const userId = ctx.state.user.id;

  ctx.body = await Thing.create({
    name,
    description,
    categoryId,
    userId,
  });
  ctx.status = 200;
};

const addThingToMarket = async (ctx) => {
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
};

const removeThingFromMarket = async (ctx) => {
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
};

module.exports = {
  addNewThing,
  addThingToMarket,
  removeThingFromMarket,
};
