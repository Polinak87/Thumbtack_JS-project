'use strict';

const {
  sequelize,
  Thing,
  User,
  Category,
  Application,
} = require('../models');

sequelize.sync({ force: true }).then(async () => {
  await Category.create({ name: 'dresses' });
  await Category.create({ name: 'skirts' });
  await Category.create({ name: 'blouses' });
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