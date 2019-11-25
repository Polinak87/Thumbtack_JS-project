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
    // categoryId: {
    //   type: Sequelize.INTEGER(50),
    // },
  }, {
    underscored: true,
    tableName: 'things',
  });

  Thing.associate = function (models) {
    Thing.belongsToMany(models.User, {
      // as: 'baseThing',
      through: models.UserThing,
      foreignKey: 'thingId',
    });
    Thing.hasMany(models.UserThing, {
      // as: 'baseThing',
      foreignKey: 'thingId',
    });
    Thing.belongsTo(models.Category, {
      foreignKey: 'categoryId',
    });
  };

  return Thing;
};
