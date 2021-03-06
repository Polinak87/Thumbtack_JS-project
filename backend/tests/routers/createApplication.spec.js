'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  Category,
  sequelize,
} = require('../../models');
const { PENDING } = require('../../routers/controllers/actionsWithApplication');

describe('Actions with applications', () => {
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

    await agent2
      .post('/api/userthings')
      .field({ name: 'gold ring' })
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

  test('create application', async () => {
    const agent1 = await request.agent(this.app);
    const agent2 = await request.agent(this.app);

    await agent1
      .post('/api/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    await agent1
      .put('/api/userthings')
      .send({ id: 1 });

    await agent2
      .post('/api/login')
      .send({
        email: 'mitroshka@mail.ru',
        password: 'ggg',
      });

    await agent2
      .put('/api/userthings')
      .send({ id: 2 });

    const response = await agent1
      .post('/api/applications')
      .send({
        idThingOffered: 1,
        idThingDesired: 2,
        idUserAnswer: 2,
      });

    const { statusCode, body } = response;

    const {
      idUserAuthor,
      idThingOffered,
      idUserAnswer,
      idThingDesired,
      status,
    } = body;

    expect(statusCode).toBe(201);
    expect(idUserAuthor).toBe(1);
    expect(idThingOffered).toBe(1);
    expect(idUserAnswer).toBe(2);
    expect(idThingDesired).toBe(2);
    expect(status).toBe(PENDING);
  });
});
