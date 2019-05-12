'use strict';

const request = require('supertest');
const { app } = require('../../app');
const {
  User,
  Category,
  sequelize,
} = require('../../models');

describe('Actions with things', () => {
  beforeAll(async () => {
    this.app = app.callback();
    await sequelize.sync({ force: true });
    await User.create({
      firstName: 'Polina',
      lastName: 'Kozlova',
      email: 'polinak87@mail.ru',
      password: 'ggg',
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('Get categoties for form', async () => {
    const agent = await request.agent(this.app);

    await agent
      .post('/api/login')
      .send({
        email: 'polinak87@mail.ru',
        password: 'ggg',
      });

    await Category.create({ name: 'dresses' });
    await Category.create({ name: 'rings' });
    await Category.create({ name: 'bags' });

    const response = await agent
      .get('/api/category');

    const array = response.body;

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(array[0].name).toBe('dresses');
    expect(array[1].name).toBe('rings');
    expect(array[2].name).toBe('bags');
  });
});