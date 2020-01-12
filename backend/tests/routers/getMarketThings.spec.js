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

    await Category.create({ name: 'dresses' });
    await Category.create({ name: 'rings' });

    const agent1 = await request.agent(this.app);
    const agent2 = await request.agent(this.app);

    await agent1
      .post('/api/registration')
      .send({
        firstName: 'Polina',
        lastName: 'Kozlova',
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    await agent2
      .post('/api/registration')
      .send({
        firstName: 'Anna',
        lastName: 'Mitrofanova',
        email: 'mitroshka@mail.ru',
        password: 'ggg',
      });

    await agent1
      .post('/api/userthings')
      .field({ name: 'winter dress' })
      .field({ description: 'pretty' })
      .field({ categoryId: 1 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent1
      .post('/api/userthings')
      .field({ name: 'summer dress' })
      .field({ description: 'light' })
      .field({ categoryId: 1 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent1
      .post('/api/userthings')
      .field({ name: 'gold ring' })
      .field({ description: 'modern style' })
      .field({ categoryId: 2 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent2
      .post('/api/userthings')
      .field({ name: 'silver ring' })
      .field({ description: 'modern style' })
      .field({ categoryId: 2 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent1
      .post('/api/logout');

    await agent2
      .post('/api/logout');
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Get things for market', async () => {
    const agent1 = await request.agent(this.app);
    const agent2 = await request.agent(this.app);

    await agent1
      .post('/api/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    await agent1
      .put('/api/userthings/1')
      .send({ onMarket: true });

    await agent2
      .post('/api/login')
      .send({
        email: 'mitroshka@mail.ru',
        password: 'ggg',
      });

    await agent2
      .put('/api/userthings/4')
      .send({ onMarket: true });

    const response = await agent1
      .get('/api/userthings/market')
      .query({
        filtrationType: 'all',
        sortingType: 'DESC',
      });

    const { statusCode, body } = response;

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(2);

    let {
      Thing: thing,
      id,
      onMarket,
      onMarketAt,
    } = body[0];
    let { image, name, description, Category: category } = thing;
    let { name: categoryName } = category;

    expect(id).toBe(1);
    expect(image).toBeDefined();
    expect(name).toBe('winter dress');
    expect(description).toBe('pretty');
    expect(categoryName).toBe('dresses');
    expect(onMarket).toBeTruthy();
    expect(onMarketAt).toBeDefined();

    ({
      Thing: thing,
      id,
      onMarket,
      onMarketAt,
    } = body[1]);
    ({ image, name, description, Category: category } = thing);
    ({ name: categoryName } = category);

    expect(id).toBe(4);
    expect(image).toBeDefined();
    expect(name).toBe('silver ring');
    expect(description).toBe('modern style');
    expect(categoryName).toBe('rings');
    expect(onMarket).toBeTruthy();
    expect(onMarketAt).toBeDefined();
  });
});
