'use strict';

const {
  Thing,
  User,
  Application,
} = require('../models');

User.sync({ force: true }).then(async () => {
  await User.create({
    firstName: 'Polina',
    lastName: 'Kozlova',
    email: 'polinacheez@gmail.com',
    password: 'ggg',
  });
  await User.create({
    firstName: 'Anna',
    lastName: 'Mitrofanova',
    email: 'mitroshka@mail.com',
    password: 'ggg',
  });
});

Thing.sync({ force: true }).then(async () => {
  await Thing.create({
    name: 'summer dress',
    description: 'pretty',
    categoryId: '1',
    userId: '1',
    onMarket: false,
    onMarketAt: null,
  });
  await Thing.create({
    name: 'summer dress',
    description: 'light',
    categoryId: '1',
    userId: '2',
    onMarket: false,
    onMarketAt: null,
  });
});

Application.sync({ force: true }).then(async () => {
  await Application.create({
    idApplicationOutbox: 1,
    idUserAuthor: 1,
    idThingOffered: 1,
    idApplicationInbox: 1,
    idUserAnswer: 2,
    idThingDesired: 2,
    status: 'pending',
  });
});
