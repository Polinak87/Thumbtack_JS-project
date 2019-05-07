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
    // await sequelize.drop();
    await sequelize.close();
  });

  // test('when not authenticated', async () => {
  //   const response = await request(this.app)
  //     .get('/userthings');

  //   expect(response.statusCode).toBe(401);
  //   expect(response.text).toBe('Unauthenticated');
  // });

  test('registration', async () => {
    const agent = await request.agent(this.app);

    const response = await agent
      .post('/api/registration')
      .send({
        firstName: 'Polina',
        lastName: 'Kozlova',
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    await expect(response.statusCode).toBe(200);

    await expect(response.body).toEqual({
      firstName: 'Polina',
      id: 1,
      lastName: 'Kozlova',
    });
  });

  test('log out', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    const response = await agent
      .get('/logout');

    expect(response.statusCode).toBe(200);
  });

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
