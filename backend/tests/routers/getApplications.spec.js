'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  Category,
  sequelize,
} = require('../../models');
const {
  PENDING,
  REJECTED,
  CANCELED,
} = require('../../routers/controllers/actionsWithApplication');

describe('Get applications', () => {
  beforeAll(async () => {
    this.app = app.callback();
  });

  beforeEach(async () => {
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
      .put('/api/userthings')
      .send({ id: 1 });

    await agent2
      .post('/api/registration')
      .send({
        firstName: 'Anna',
        lastName: 'Mitrofanova',
        email: 'mitroshka@mail.ru',
        password: 'ggg',
      });

    await agent2
      .post('/api/userthings')
      .field({ name: 'gold ring' })
      .field({ description: 'modern style' })
      .field({ categoryId: 2 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent2
      .put('/api/userthings/3')
      .send({ onMarket: true });

    await agent1
      .post('/api/applications')
      .send({
        idThingOffered: 1,
        idThingDesired: 3,
        idUserAnswer: 2,
      });

    await agent1
      .post('/api/applications')
      .send({
        idThingOffered: 2,
        idThingDesired: 3,
        idUserAnswer: 2,
      });

    await agent1
      .post('/api/logout');

    await agent2
      .post('/api/logout');
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Get applications', () => {
    test('get outbox applications', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .get('/api/applications/outbox')
        .query({
          status: 'all',
        });

      const { statusCode, body } = response;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(2);
      expect(body[0].idUserAuthor).toBe(1);
      expect(body[1].idUserAuthor).toBe(1);
      expect(body[0].idThingOffered).toBe(1);
      expect(body[1].idThingOffered).toBe(2);
      expect(body[0].idUserAnswer).toBe(2);
      expect(body[1].idUserAnswer).toBe(2);
      expect(body[0].idThingDesired).toBe(3);
      expect(body[1].idThingDesired).toBe(3);
      expect(body[0].status).toBe(PENDING);
      expect(body[1].status).toBe(PENDING);
    });

    test('get inbox applications', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .get('/api/applications/inbox')
        .query({
          status: 'all',
        });

      const { statusCode, body } = response;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(2);
      expect(body[0].idUserAuthor).toBe(1);
      expect(body[1].idUserAuthor).toBe(1);
      expect(body[0].idThingOffered).toBe(1);
      expect(body[1].idThingOffered).toBe(2);
      expect(body[0].idUserAnswer).toBe(2);
      expect(body[1].idUserAnswer).toBe(2);
      expect(body[0].idThingDesired).toBe(3);
      expect(body[1].idThingDesired).toBe(3);
      expect(body[0].status).toBe(PENDING);
      expect(body[1].status).toBe(PENDING);
    });

    test('get filtered outbox applications', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      await agent
        .put('/api/applications/1/cancel');

      const response = await agent
        .get('/api/applications/outbox')
        .query({
          status: CANCELED,
        });

      const { statusCode, body } = response;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(body[0].id).toBe(1);
      expect(body[0].idUserAuthor).toBe(1);
      expect(body[0].idThingOffered).toBe(1);
      expect(body[0].idUserAnswer).toBe(2);
      expect(body[0].idThingDesired).toBe(3);
      expect(body[0].status).toBe(CANCELED);
    });
    test('get filtered inbox applications', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      await agent
        .put('/api/applications/2/reject');

      const response = await agent
        .get('/api/applications/inbox')
        .query({
          status: REJECTED,
        });

      const { statusCode, body } = response;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(body[0].id).toBe(2);
      expect(body[0].idUserAuthor).toBe(1);
      expect(body[0].idThingOffered).toBe(2);
      expect(body[0].idUserAnswer).toBe(2);
      expect(body[0].idThingDesired).toBe(3);
      expect(body[0].status).toBe(REJECTED);
    });
  });
});

