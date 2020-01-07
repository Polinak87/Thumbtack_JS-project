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

    await expect(response.statusCode).toBe(200);

    await expect(response.body).toEqual({
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
    await expect(response.body).toEqual({
      firstName: 'John',
      id: 3,
      lastName: 'Kozlov',
    });
  });

  // переписать, когда будет условие аутентификации на бэке
  test('when authenticated', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    const response = await agent
      .get('/profile');

    expect(response.statusCode).toBe(200);
    await expect(response.body).toEqual({});
  });
});
