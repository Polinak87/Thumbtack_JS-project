'use strict';

const {
  sequelize,
  Thing,
  User,
  Application,
  UserThing,
} = require('../models');

const { PENDING } = require('../routers/controllers/actionsWithApplication');

sequelize.sync({ force: false }).then(async () => {
  await User.create({
    firstName: 'Polina',
    lastName: 'Kozlova',
    email: 'polinacheez@gmail.com',
    password: 'ggg',
  });
  await User.create({
    firstName: 'Anna',
    lastName: 'Mitrofanova',
    email: 'mitroshka@mail.ru',
    password: 'ggg',
  });
  await Thing.create({
    image: 'images/uploaded/dress1.png',
    name: 'summer dress',
    description: 'pretty',
    categoryId: '1',
  });
  await Thing.create({
    image: 'images/uploaded/dress2.png',
    name: 'summer dress',
    description: 'light',
    categoryId: '1',
  });
  await Thing.create({
    image: 'images/uploaded/dress3.png',
    name: 'spring dress',
    description: 'silk',
    categoryId: '1',
  });
  await UserThing.create({
    userId: '1',
    thingId: '1',
    onMarket: 'true',
    onMarketAt: new Date(),
  });
  await UserThing.create({
    userId: '1',
    thingId: '2',
    onMarket: 'true',
    onMarketAt: new Date(),
  });
  await UserThing.create({
    userId: '2',
    thingId: '3',
    onMarket: 'true',
    onMarketAt: new Date(),
  });
  await Application.create({
    idUserAuthor: 1,
    idThingOffered: 1,
    idUserAnswer: 2,
    idThingDesired: 3,
    status: PENDING,
  });

  await Application.create({
    idUserAuthor: 2,
    idThingOffered: 3,
    idUserAnswer: 1,
    idThingDesired: 1,
    status: PENDING,
  });

  await Application.create({
    idUserAuthor: 2,
    idThingOffered: 3,
    idUserAnswer: 1,
    idThingDesired: 2,
    status: PENDING,
  });
});
