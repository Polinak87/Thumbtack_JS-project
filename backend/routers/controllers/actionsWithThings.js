'use strict';

const { Thing, UserThing } = require('../../models');

const addNewThing = async (ctx) => {
  const { name, description, categoryId } = ctx.req.body;
  const userId = ctx.state.user.id;

  await Thing.create({
    name,
    description,
    categoryId,
    image: ctx.req.file.path.substring(7),
  }).then((thing) => {
    UserThing.create({
      userId,
      thingId: thing.id,
      onMarket: false,
    });
  });
  ctx.status = 200;
};

const addThingFromCatalog = async (ctx) => {
  const { id } = ctx.request.body;
  const userId = ctx.state.user.id;

  try {
    await UserThing.create({
      userId,
      thingId: id,
      onMarket: false,
    });
  } catch (err) {
    console.log(err);
  }
  // ctx.body = Thing; // make an error
  ctx.status = 200;
};

const addThingToMarket = async (ctx) => {
  const thingId = ctx.request.body.id;
  const date = new Date();

  await UserThing.update(
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

  await UserThing.update(
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
  addThingFromCatalog,
  addThingToMarket,
  removeThingFromMarket,
};
