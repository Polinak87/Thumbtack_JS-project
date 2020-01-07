'use strict';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const { db } = require('../config')[env];

const options = {
  host: db.host,
  port: db.port,
  dialect: db.dialect,
};

if (process.env.NODE_ENV === 'test') {
  options.logging = false;
}

const sequelize = new Sequelize(db.name, db.username, db.password, options);

const User = require('./user')(sequelize);
const Category = require('./category')(sequelize);
const Thing = require('./thing')(sequelize);
const Application = require('./application')(sequelize);
const UserThing = require('./user_thing')(sequelize);

const models = {
  [User.name]: User,
  [Category.name]: Category,
  [Thing.name]: Thing,
  [UserThing.name]: UserThing,
  [Application.name]: Application,
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
