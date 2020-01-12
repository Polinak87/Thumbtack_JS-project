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
    name: 'summer dress',
    description: 'pretty',
    categoryId: '1',
  });
  await Thing.create({
    name: 'summer dress',
    description: 'light',
    categoryId: '1',
  });
  await Thing.create({
    name: 'spring dress',
    description: 'silk',
    categoryId: '1',
  });
  await UserThing.create({
    userId: '1',
    thingId: '1',
    onMarket: 'true',
  });
  await UserThing.create({
    userId: '1',
    thingId: '2',
    onMarket: 'false',
  });
  await UserThing.create({
    userId: '2',
    thingId: '3',
    onMarket: 'false',
  });
  await Application.create({
    idUserAuthor: 1,
    idThingOffered: 1,
    idUserAnswer: 2,
    idThingDesired: 3,
    status: PENDING,
  });
});
