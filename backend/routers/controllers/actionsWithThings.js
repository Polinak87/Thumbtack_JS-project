'use strict';

const { Thing, User, UserThing, Category } = require('../../models');
const { checkAuthentication } = require('./authorization');

const addNewThing = async (ctx) => {
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
  const { id } = ctx.request.body;
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

const addThingToMarket = async (ctx) => {
  await checkAuthentication(ctx);
  const thingId = ctx.request.body.id;

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

  thing.onMarket = true;
  thing.onMarketAt = new Date();
  await thing.save();

  ctx.body = thing;
  ctx.status = 200;
};

const removeThingFromMarket = async (ctx) => {
  await checkAuthentication(ctx);
  const thingId = ctx.request.body.id;

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
