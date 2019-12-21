'use strict';

const { Thing, UserThing, Category } = require('../../models');

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

  ctx.body = await UserThing.create({
    userId,
    thingId: id,
    onMarket: false,
  });
  ctx.status = 200;
};

const addThingToMarket = async (ctx) => {
  const thingId = ctx.request.body.id;

  const thing = await UserThing.findOne({
    include: [{
      model: Thing,
      include: [{
        model: Category,
      }],
    }],
    where: {
      id: thingId,
    },
  });

  thing.onMarket = true;
  thing.onMarketAt = new Date();
  await thing.save();

  ctx.body = thing;
  ctx.status = 200;
};

const removeThingFromMarket = async (ctx) => {
  const thingId = ctx.request.body.id;

  const thing = await UserThing.findOne({
    include: [{
      model: Thing,
      include: [{
        model: Category,
      }],
    }],
    where: {
      id: thingId,
    },
  });

  thing.onMarket = false;
  thing.onMarketAt = null;
  await thing.save();

  ctx.body = thing;
  ctx.status = 200;
};

module.exports = {
  addNewThing,
  addThingFromCatalog,
  addThingToMarket,
  removeThingFromMarket,
};
