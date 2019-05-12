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
      email: 'mitroshka@mail.com',
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
      name: 'summer dress',
      description: 'light',
      categoryId: 1,
      userId: 1,
      onMarket: false,
      onMarketAt: null,
    });

    await Thing.create({
      name: 'gold ring',
      description: 'modern style',
      categoryId: 2,
      userId: 1,
      onMarket: false,
      onMarketAt: null,
    });

    await Thing.create({
      name: 'silver ring',
      description: 'modern style',
      categoryId: 2,
      userId: 2,
      onMarket: false,
      onMarketAt: null,
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Get things for market', async () => {
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
      .send({ id: 3 });

    const response = await agent
      .get('/api/marketthings');

    const array = response.body;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(array[0].name).toBe('winter dress');
    expect(array[1].name).toBe('gold ring');
    expect(array[0].description).toBe('pretty');
    expect(array[1].description).toBe('modern style');
    expect(array[0].categoryId).toBe(1);
    expect(array[1].categoryId).toBe(2);
    expect(array[0].userId).toBe(1);
    expect(array[1].userId).toBe(1);
    expect(array[0].onMarket).toBe(true);
    expect(array[1].onMarket).toBe(true);
    expect(array[0].onMarketAt).toBeDefined();
    expect(array[1].onMarketAt).toBeDefined();
  });
});
