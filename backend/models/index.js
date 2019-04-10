'use strict';

const Sequelize = require('sequelize');
const { db } = require('../config');

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
});

const Thing = require('./thing')(sequelize);

const models = {
  [Thing.name]: Thing,
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
