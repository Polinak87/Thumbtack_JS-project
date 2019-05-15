'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  Category,
  sequelize,
} = require('../../models');

describe('Actions with things', () => {
  beforeAll(async () => {
    this.app = app.callback();

    await sequelize.sync({ force: true });
    await Category.create({ name: 'bags' });

    const agent = await request.agent(this.app);

    await agent
      .post('/api/registration')
      .send({
        firstName: 'Polina',
        lastName: 'Kozlova',
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    await agent
      .post('/api/logout');
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Add new thing to inventory', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    const response = await agent
      .post('/api/addnewthing')
      .send({
        name: 'bag',
        description: 'red leather',
        categoryId: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe('bag');
    expect(response.body.description).toBe('red leather');
    expect(response.body.categoryId).toBe(1);
    expect(response.body.userId).toBe(1);
  });

  test('Add thing to market', async () => {
    const id = 1;
    const agent = await request.agent(this.app);
    const response = await agent
      .post('/api/addthingtomarket')
      .send({ id });

    expect(response.statusCode).toBe(200);
    expect(response.body.onMarket).toBe(true);
    expect(response.body.onMarketAt).toBeDefined();
  });

  test('Remove thing from market', async () => {
    const id = 1;
    const agent = await request.agent(this.app);
    const response = await agent
      .post('/api/removethingfrommarket')
      .send({ id });

    expect(response.statusCode).toBe(200);
    expect(response.body.onMarket).toBe(false);
    expect(response.body.onMarketAt).toBeNull();
  });
});

