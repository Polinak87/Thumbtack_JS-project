'use strict';

const { Thing, User, UserThing, Category } = require('../../models');
const { checkAuthentication } = require('./authorization');

const downloadNewThing = async (ctx) => {
  await checkAuthentication(ctx);
  const { name, description, categoryId } = ctx.req.body;
  const userId = ctx.state.user.id;

  const thing = await Thing.create({
    name,
    description,
    categoryId,
    image: ctx.req.file.path.substring(7),
  });

  const userThing = await UserThing.create({
    userId,
    thingId: thing.id,
    onMarket: false,
  });

  ctx.body = await UserThing.findOne({
    include: [{
      model: Thing,
      include: [{
        model: Category,
      }],
    }, {
      model: User,
    }],
    where: {
      id: userThing.id,
    },
  });

  ctx.status = 201;
};

const addThingFromCatalog = async (ctx) => {
  await checkAuthentication(ctx);
  const { id } = ctx.params;
  const userId = ctx.state.user.id;

  const newUserThing = await UserThing.create({
    userId,
    thingId: id,
    onMarket: false,
  });

  const { id: newUserThingId } = newUserThing;

  ctx.body = await UserThing.findOne({
    include: [{
      model: Thing,
      include: [{
        model: Category,
      }],
    }, {
      model: User,
    }],
    where: {
      id: newUserThingId,
    },
  });

  ctx.status = 201;
};

const addRemoveThingFromMarket = async (ctx) => {
  await checkAuthentication(ctx);
  const { id: thingId } = ctx.params;
  const { onMarket } = ctx.request.body;

  const thing = await UserThing.findOne({
    include: [{
      model: Thing,
      include: [{
        model: Category,
      }],
    }, {
      model: User,
    }],
    where: {
      id: thingId,
    },
  });

  thing.onMarket = onMarket;

  if (onMarket) {
    thing.onMarketAt = new Date();
  } else {
    thing.onMarketAt = null;
  }

  await thing.save();

  ctx.body = thing;
  ctx.status = 200;
};

module.exports = {
  downloadNewThing,
  addThingFromCatalog,
  addRemoveThingFromMarket,
};
