'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  Category,
  sequelize,
} = require('../../models');

describe('Actions with applications', () => {
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
        idThingOffered: 2,
        idThingDesired: 1,
        idUserAnswer: 1,
      });

    await agent1
      .post('/api/logout');

    await agent2
      .post('/api/logout');
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('When status is pending', () => {
    test('Cancele application', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .put('/api/canceleapplication')
        .send({
          id: 1,
        });

      const { status, message } = response.body;

      expect(response.statusCode).toBe(200);
      expect(message).toBe('');
      expect(status).toBe('canceled');
    });

    test('Reject application', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .put('/api/rejectapplication')
        .send({
          id: 1,
        });
      const { status, message } = response.body;

      expect(response.statusCode).toBe(200);
      expect(message).toBe('');
      expect(status).toBe('rejected');
    });

    test('Complete application', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .put('/api/completeapplication')
        .send({
          id: 1,
        });

      const array = response.body;
      const { id, status, message } = array[0];

      expect(response.statusCode).toBe(200);
      expect(array).toHaveLength(1);
      expect(id).toBe(1);
      expect(status).toBe('completed');
      expect(message).toBe('');
    });
  });

  describe('When status is not pending', () => {
    test('Cancele application', async () => {
      const agent1 = await request.agent(this.app);
      const agent2 = await request.agent(this.app);

      await agent1
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      await agent2
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      await agent2
        .put('/api/completeapplication')
        .send({
          id: 1,
        });

      const response = await agent1
        .put('/api/canceleapplication')
        .send({
          id: 1,
        });

      const { status, message } = response.body;

      expect(response.statusCode).toBe(200);
      expect(message).toBe('Ops, another user has just answered on your application for exchange this thing.');
      expect(status).toBe('completed');
    });

    test('Reject application', async () => {
      const agent1 = await request.agent(this.app);
      const agent2 = await request.agent(this.app);

      await agent1
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      await agent2
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      await agent1
        .put('/api/canceleapplication')
        .send({
          id: 1,
        });

      const response = await agent2
        .put('/api/rejectapplication')
        .send({
          id: 1,
        });

      const { status, message } = response.body;

      expect(response.statusCode).toBe(200);
      expect(message).toBe('Ops, the other user has just canceled the application.');
      expect(status).toBe('canceled');
    });

    test('Complete application', async () => {
      const agent1 = await request.agent(this.app);
      const agent2 = await request.agent(this.app);

      await agent1
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      await agent2
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      await agent1
        .put('/api/canceleapplication')
        .send({
          id: 1,
        });

      const response = await agent2
        .put('/api/completeapplication')
        .send({
          id: 1,
        });

      const array = response.body;
      const { id, status, message } = array[0];

      expect(response.statusCode).toBe(200);
      expect(array).toHaveLength(1);
      expect(id).toBe(1);
      expect(status).toBe('canceled');
      expect(message).toBe('Very sorry, the other user has just canceled the application.');
    });
  });
});
