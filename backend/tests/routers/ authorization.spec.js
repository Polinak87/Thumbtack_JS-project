'use strict';

const request = require('supertest');
const { app } = require('../../app');
const { sequelize } = require('../../models');

describe('Users', () => {
  beforeAll(async () => {
    this.app = app.callback();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('registration', async () => {
    const agent = await request.agent(this.app);

    const response = await agent
      .post('/api/registration')
      .send({
        firstName: 'Masha',
        lastName: 'Kozlova',
        email: 'masha@mail.ru',
        password: 'ggg',
      });

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({
      firstName: 'Masha',
      id: 1,
      lastName: 'Kozlova',
    });
  });

  test('logout', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/registration')
      .send({
        firstName: 'Nik',
        lastName: 'Kozlov',
        email: 'Nik@mail.ru',
        password: 'ggg',
      });

    const response = await agent
      .post('/api/logout');

    expect(response.statusCode).toBe(302);
  });

  test('login', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/registration')
      .send({
        firstName: 'John',
        lastName: 'Kozlov',
        email: 'john@mail.ru',
        password: 'ggg',
      });

    await agent
      .post('/api/logout');

    const response = await agent
      .post('/api/login')
      .send({
        email: 'john@mail.ru',
        password: 'ggg',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      firstName: 'John',
      id: 3,
      lastName: 'Kozlov',
    });
  });

  test('when not authenticated', async () => {
    const agent = await request.agent(this.app);

    const response = await agent
      .get('/api/user');

    expect(response.statusCode).toBe(401);
    expect(response.text).toBe('Unauthenticated');
  });

  test('when authenticated', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/login')
      .send({
        email: 'masha@mail.ru',
        password: 'ggg',
      });

    const response = await agent
      .get('/api/user');

    const { statusCode, body } = response;
    const { firstName, lastName, id } = body;

    expect(statusCode).toBe(200);
    expect(firstName).toEqual('Masha');
    expect(lastName).toEqual('Kozlova');
    expect(id).toEqual(1);
  });
});
