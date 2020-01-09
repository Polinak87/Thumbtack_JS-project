'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  Category,
  sequelize,
} = require('../../models');

describe('get applications', () => {
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
      .post('/api/addnewthing')
      .field({ name: 'winter dress' })
      .field({ description: 'pretty' })
      .field({ categoryId: 1 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent1
      .post('/api/addnewthing')
      .field({ name: 'summer dress' })
      .field({ description: 'light' })
      .field({ categoryId: 1 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent1
      .post('/api/addthingtomarket')
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
      .post('/api/addnewthing')
      .field({ name: 'gold ring' })
      .field({ description: 'modern style' })
      .field({ categoryId: 2 })
      .attach('file', 'backend/tests/routers/test-image.png');

    await agent2
      .post('/api/addthingtomarket')
      .send({ id: 3 });

    await agent1
      .post('/api/createapplication')
      .send({
        idThingOffered: 1,
        idThingDesired: 3,
        idUserAnswer: 2,
      });

    await agent1
      .post('/api/createapplication')
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

  describe('get applications', () => {
    test('get outbox applications', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .get('/api/applicationsoutbox')
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
      expect(body[0].status).toBe('pending');
      expect(body[1].status).toBe('pending');
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
        .get('/api/applicationsinbox')
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
      expect(body[0].status).toBe('pending');
      expect(body[1].status).toBe('pending');
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
        .put('/api/canceleapplication')
        .send({
          id: 1,
        });

      const response = await agent
        .get('/api/applicationsoutbox')
        .query({
          status: 'canceled',
        });

      const { statusCode, body } = response;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(body[0].id).toBe(1);
      expect(body[0].idUserAuthor).toBe(1);
      expect(body[0].idThingOffered).toBe(1);
      expect(body[0].idUserAnswer).toBe(2);
      expect(body[0].idThingDesired).toBe(3);
      expect(body[0].status).toBe('canceled');
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
        .put('/api/rejectapplication')
        .send({
          id: 2,
        });

      const response = await agent
        .get('/api/applicationsinbox')
        .query({
          status: 'rejected',
        });

      const { statusCode, body } = response;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(body[0].id).toBe(2);
      expect(body[0].idUserAuthor).toBe(1);
      expect(body[0].idThingOffered).toBe(2);
      expect(body[0].idUserAnswer).toBe(2);
      expect(body[0].idThingDesired).toBe(3);
      expect(body[0].status).toBe('rejected');
    });
  });
});

