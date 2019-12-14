'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Thing = sequelize.define('Thing', {
    name: {
      type: Sequelize.STRING(50),
    },
    description: {
      type: Sequelize.STRING(50),
    },
    image: {
      type: Sequelize.STRING(500),
    },
  }, {
    underscored: true,
    tableName: 'things',
  });

  Thing.associate = function (models) {
    Thing.belongsToMany(models.User, {
      through: models.UserThing,
      foreignKey: 'thingId',
    });
    Thing.hasMany(models.UserThing, {
      foreignKey: 'thingId',
    });
    Thing.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
  };

  return Thing;
};
