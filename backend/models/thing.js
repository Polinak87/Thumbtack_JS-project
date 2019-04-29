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
    categoryId: {
      type: Sequelize.INTEGER(50),
    },
    userId: {
      type: Sequelize.INTEGER(50),
    },
    onMarket: {
      type: Sequelize.BOOLEAN,
    },
    onMarketAt: {
      type: Sequelize.DATE,
    },
  }, {
    underscored: true,
    tableName: 'things',
  });

  Thing.associate = function (models) {
    Thing.belongsTo(models.User);
    Thing.belongsTo(models.Category);
    Thing.hasOne(models.Application, {
      as: 'ThingOffered',
      foreignKey: 'idThingOffered',
    });
    Thing.hasOne(models.Application, {
      as: 'ThingDesired',
      foreignKey: 'idThingDesired',
    });
  };

  return Thing;
};
