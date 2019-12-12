'use strict';

const multer = require('koa-multer');
const { Thing, UserThing } = require('../../models');

const addNewThing = async (ctx) => {
  const { name, description, categoryId } = ctx.request.body;
  const userId = ctx.state.user.id;

  await Thing.create({
    name,
    description,
    categoryId,
  }).then((thing) => {
    UserThing.create({
      userId,
      thingId: thing.id,
      onMarket: false,
    });
  });
  // ctx.body = Thing; // make an error
  ctx.status = 200;
};

const addThingFromCatalog = async (ctx) => {
  const { id } = ctx.request.body;
  const userId = ctx.state.user.id;

  await UserThing.create({
    userId,
    thingId: id,
    onMarket: false,
  });
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/public/images/uploaded');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const uploadThingImage = async (ctx) => {
  ctx.body = {
    result: 'запрос прошел',
  };
  ctx.status = 200;
};

module.exports = {
  addNewThing,
  addThingFromCatalog,
  addThingToMarket,
  removeThingFromMarket,
  uploadThingImage,
  upload,
};
