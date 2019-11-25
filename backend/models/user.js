'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: {
      type: Sequelize.STRING(50),
    },
    lastName: {
      type: Sequelize.STRING(50),
    },
    email: {
      type: Sequelize.STRING(50),
    },
    password: {
      type: Sequelize.STRING(50),
    },
  }, {
    underscored: true,
    tableName: 'users',
  });

  User.associate = function (models) {
    User.belongsToMany(models.Thing, {
      // as: 'owner',
      through: models.UserThing,
      foreignKey: 'userId',
    });
  };

  return User;
};
