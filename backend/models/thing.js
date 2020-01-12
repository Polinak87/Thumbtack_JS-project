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
    const { User, UserThing, Category } = models;

    Thing.belongsToMany(User, {
      through: UserThing,
      foreignKey: 'thingId',
    });
    Thing.hasMany(UserThing, {
      foreignKey: 'thingId',
    });
    Thing.belongsTo(Category, {
      foreignKey: 'categoryId',
    });
  };

  return Thing;
};
