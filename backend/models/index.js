'use strict';

const Sequelize = require('sequelize');
const { db } = require('../config');

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
});

const Thing = require('./thing')(sequelize);
const User = require('./user')(sequelize);
const Category = require('./category')(sequelize);

const models = {
  [Thing.name]: Thing,
  [User.name]: User,
  [Category.name]: Category,

};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models,
};
