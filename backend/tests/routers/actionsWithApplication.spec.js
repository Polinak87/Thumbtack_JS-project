'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  Category,
  sequelize,
} = require('../../models');
const {
  CANCELED,
  REJECTED,
  COMPLETED,
} = require('../../routers/controllers/actionsWithApplication');

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
      .post('/api/userthings')
      .field({ name: 'winter dress' })
      .field({ description: 'pretty' })
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
      .put('/api/userthings')
      .send({ id: 2 });

    await agent1
      .post('/api/applications')
      .send({
        idThingOffered: 1,
        idThingDesired: 2,
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

  describe('When status is pending', () => {
    test('cancel application', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .put('/api/applications/1/cancel');

      const { statusCode, body } = response;
      const { currentApplication, message } = body;
      const { status } = currentApplication;

      expect(statusCode).toBe(200);
      expect(message).toBe('');
      expect(status).toBe(CANCELED);
    });

    test('reject application', async () => {
      const agent = await request.agent(this.app);

      await agent
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      const response = await agent
        .put('/api/applications/1/reject');

      const { statusCode, body } = response;
      const { currentApplication, message } = body;
      const { status } = currentApplication;

      expect(statusCode).toBe(200);
      expect(message).toBe('');
      expect(status).toBe(REJECTED);
    });

    test('complete application', async () => {
      const agent1 = await request.agent(this.app);
      const agent2 = await request.agent(this.app);

      await agent2
        .post('/api/login')
        .send({
          email: 'mitroshka@mail.ru',
          password: 'ggg',
        });

      let response = await agent2
        .put('/api/applications/1/complete');

      let { statusCode, body } = response;
      const { application, message } = body[0];
      const { id, status } = application;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(id).toBe(1);
      expect(status).toBe(COMPLETED);
      expect(message).toBe('');

      await agent1
        .post('/api/login')
        .send({
          email: 'polinak87@mail.ru',
          password: 'ggg',
        });

      response = await agent1
        .get('/api/userthings/inventory');

      ({ statusCode, body } = response);

      let {
        Thing: thing,
        id: thingId,
        onMarket,
        onMarketAt,
      } = body[0];
      let { image, name, description, Category: category } = thing;
      let { id: categoryId } = category;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(thingId).toBe(2);
      expect(image).toBeDefined();
      expect(name).toBe('gold ring');
      expect(description).toBe('modern style');
      expect(categoryId).toBe(2);
      expect(onMarket).toBe(false);
      expect(onMarketAt).toBeNull();

      response = await agent2
        .get('/api/userthings/inventory');

      ({ statusCode, body } = response);

      ({
        Thing: thing,
        id: thingId,
        onMarket,
        onMarketAt,
      } = body[0]);
      ({ image, name, description, Category: category } = thing);
      ({ id: categoryId } = category);

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(id).toBe(1);
      expect(image).toBeDefined();
      expect(name).toBe('winter dress');
      expect(description).toBe('pretty');
      expect(categoryId).toBe(1);
      expect(onMarket).toBe(false);
      expect(onMarketAt).toBeNull();
    });
  });

  describe('When status is not pending', () => {
    test('cancel application', async () => {
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
        .put('/api/applications/1/complete');

      const response = await agent1
        .put('/api/applications/1/cancel');

      const { statusCode, body } = response;
      const { currentApplication, message } = body;
      const { status } = currentApplication;

      expect(statusCode).toBe(200);
      expect(message).toBe('Ops, another user has just answered on your application for exchange this thing.');
      expect(status).toBe(COMPLETED);
    });

    test('reject application', async () => {
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
        .put('/api/applications/1/cancel');

      const response = await agent2
        .put('/api/applications/1/reject');

      const { statusCode, body } = response;
      const { currentApplication, message } = body;
      const { status } = currentApplication;

      expect(statusCode).toBe(200);
      expect(message).toBe('Ops, the other user has just canceled the application.');
      expect(status).toBe(CANCELED);
    });

    test('complete application', async () => {
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
        .put('/api/applications/1/cancel');

      const response = await agent2
        .put('/api/applications/1/complete');

      const { statusCode, body } = response;
      const { application, message } = body[0];
      const { status, id } = application;

      expect(statusCode).toBe(200);
      expect(body).toHaveLength(1);
      expect(id).toBe(1);
      expect(status).toBe(CANCELED);
      expect(message).toBe('Very sorry, the other user has just canceled the application.');
    });
  });
});
