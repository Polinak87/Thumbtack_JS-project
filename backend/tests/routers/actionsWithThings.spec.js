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
      .field({ name: 'bag' })
      .field({ description: 'red leather' })
      .field({ categoryId: 1 })
      .attach('file', 'backend/tests/routers/test-image.png');

    const { statusCode, body } = response;

    const {
      Thing: thing,
      User: user,
      id,
      onMarket,
      onMarketAt,
    } = body;
    const { image, name, description, Category: category } = thing;
    const { name: categoryName } = category;
    const { id: userId } = user;

    expect(statusCode).toBe(201);
    expect(id).toBe(1);
    expect(image).toBeDefined();
    expect(name).toBe('bag');
    expect(description).toBe('red leather');
    expect(categoryName).toBe('bags');
    expect(onMarket).toBeFalsy();
    expect(onMarketAt).toBeNull();
    expect(userId).toBe(1);
  });

  test('Add thing to market', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    const response = await agent
      .put('/api/addthingtomarket')
      .send({ id: 1 });

    const { statusCode, body } = response;
    const {
      Thing: thing,
      User: user,
      id,
      onMarket,
      onMarketAt,
    } = body;
    const { image, name, description, Category: category } = thing;
    const { name: categoryName } = category;
    const { id: userId } = user;

    expect(statusCode).toBe(200);
    expect(id).toBe(1);
    expect(image).toBeDefined();
    expect(name).toBe('bag');
    expect(description).toBe('red leather');
    expect(categoryName).toBe('bags');
    expect(onMarket).toBeTruthy();
    expect(onMarketAt).toBeDefined();
    expect(userId).toBe(1);
  });

  test('Remove thing from market', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    const response = await agent
      .put('/api/removethingfrommarket')
      .send({ id: 1 });

    expect(response.statusCode).toBe(200);
    expect(response.body.onMarket).toBe(false);
    expect(response.body.onMarketAt).toBeNull();

    const { statusCode, body } = response;
    const {
      Thing: thing,
      User: user,
      id,
      onMarket,
      onMarketAt,
    } = body;
    const { image, name, description, Category: category } = thing;
    const { name: categoryName } = category;
    const { id: userId } = user;

    expect(statusCode).toBe(200);
    expect(id).toBe(1);
    expect(image).toBeDefined();
    expect(name).toBe('bag');
    expect(description).toBe('red leather');
    expect(categoryName).toBe('bags');
    expect(onMarket).toBeFalsy();
    expect(onMarketAt).toBeNull();
    expect(userId).toBe(1);
  });
});

