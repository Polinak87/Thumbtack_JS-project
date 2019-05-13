'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  User,
  Category,
  Thing,
  sequelize,
} = require('../../models');

describe('Actions with things', () => {
  beforeAll(async () => {
    this.app = app.callback();
    await sequelize.sync({ force: true });
    await User.create({
      firstName: 'Polina',
      lastName: 'Kozlova',
      email: 'polinak87@mail.ru',
      password: 'ggg',
    });
    await User.create({
      firstName: 'Anna',
      lastName: 'Mitrofanova',
      email: 'mitroshka@mail.ru',
      password: 'ggg',
    });

    await Category.create({ name: 'dresses' });
    await Category.create({ name: 'rings' });

    await Thing.create({
      name: 'winter dress',
      description: 'pretty',
      categoryId: 1,
      userId: 1,
      onMarket: false,
      onMarketAt: null,
    });

    await Thing.create({
      name: 'gold ring',
      description: 'modern style',
      categoryId: 2,
      userId: 2,
      onMarket: false,
      onMarketAt: null,
    });

    // await Thing.create({
    //   name: 'summer dress',
    //   description: 'light',
    //   categoryId: 1,
    //   userId: 1,
    //   onMarket: false,
    //   onMarketAt: null,
    // });

    // await Thing.create({
    //   name: 'silver ring',
    //   description: 'modern style',
    //   categoryId: 2,
    //   userId: 2,
    //   onMarket: false,
    //   onMarketAt: null,
    // });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Create application', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    await agent
      .post('/api/addthingtomarket')
      .send({ id: 1 });

    await agent
      .post('/api/addthingtomarket')
      .send({ id: 2 });

    // await agent
    //   .post('/api/addthingtomarket')
    //   .send({ id: 3 });

    // await agent
    //   .post('/api/addthingtomarket')
    //   .send({ id: 4 });

    const response = await agent
      .post('/api/createapplication')
      .send({
        idThingOffered: 1,
        idThingDesired: 2,
        idUserAnswer: 2,
      });

    const {
      idUserAuthor,
      idThingOffered,
      idUserAnswer,
      idThingDesired,
      status,
    } = response.body;

    expect(response.statusCode).toBe(200);
    expect(idUserAuthor).toBe(1);
    expect(idThingOffered).toBe(1);
    expect(idUserAnswer).toBe(2);
    expect(idThingDesired).toBe(2);
    expect(status).toBe('pending');
  });
});
