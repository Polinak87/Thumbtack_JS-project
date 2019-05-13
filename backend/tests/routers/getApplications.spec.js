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
      .send({
        name: 'winter dress',
        description: 'pretty',
        categoryId: 1,
        userId: 1,
        onMarket: false,
        onMarketAt: null,
      });

    await agent1
      .post('/api/addnewthing')
      .send({
        name: 'summer dress',
        description: 'light',
        categoryId: 1,
        userId: 1,
        onMarket: false,
        onMarketAt: null,
      });

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
      .send({
        name: 'gold ring',
        description: 'modern style',
        categoryId: 2,
        userId: 2,
        onMarket: false,
        onMarketAt: null,
      });

    await agent2
      .post('/api/addthingtomarket')
      .send({ id: 2 });

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
        .get('/api/applicationsoutbox');

      const array = response.body;

      expect(response.statusCode).toBe(200);
      expect(array).toHaveLength(2);
      expect(array[0].idUserAuthor).toBe(1);
      expect(array[1].idUserAuthor).toBe(1);
      expect(array[0].idThingOffered).toBe(1);
      expect(array[1].idThingOffered).toBe(2);
      expect(array[0].idUserAnswer).toBe(2);
      expect(array[1].idUserAnswer).toBe(2);
      expect(array[0].idThingDesired).toBe(3);
      expect(array[1].idThingDesired).toBe(3);
      expect(array[0].status).toBe('pending');
      expect(array[1].status).toBe('pending');
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
        .get('/api/applicationsinbox');

      const array = response.body;

      expect(response.statusCode).toBe(200);
      expect(array).toHaveLength(2);
      expect(array[0].idUserAuthor).toBe(1);
      expect(array[1].idUserAuthor).toBe(1);
      expect(array[0].idThingOffered).toBe(1);
      expect(array[1].idThingOffered).toBe(2);
      expect(array[0].idUserAnswer).toBe(2);
      expect(array[1].idUserAnswer).toBe(2);
      expect(array[0].idThingDesired).toBe(3);
      expect(array[1].idThingDesired).toBe(3);
      expect(array[0].status).toBe('pending');
      expect(array[1].status).toBe('pending');
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
        .post('/api/applicationsoutboxfiltered')
        .send({
          params: {
            status: 'canceled',
          },
        });

      const array = response.body;

      expect(response.statusCode).toBe(200);
      expect(array).toHaveLength(1);
      expect(array[0].id).toBe(1);
      expect(array[0].idUserAuthor).toBe(1);
      expect(array[0].idThingOffered).toBe(1);
      expect(array[0].idUserAnswer).toBe(2);
      expect(array[0].idThingDesired).toBe(3);
      expect(array[0].status).toBe('canceled');
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
        .post('/api/applicationsinboxfiltered')
        .send({
          params: {
            status: 'rejected',
          },
        });

      const array = response.body;

      expect(response.statusCode).toBe(200);
      expect(array).toHaveLength(1);
      expect(array[0].id).toBe(2);
      expect(array[0].idUserAuthor).toBe(1);
      expect(array[0].idThingOffered).toBe(2);
      expect(array[0].idUserAnswer).toBe(2);
      expect(array[0].idThingDesired).toBe(3);
      expect(array[0].status).toBe('rejected');
    });
  });
});

