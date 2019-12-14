'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const UserThing = sequelize.define('UserThing', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    onMarket: {
      type: Sequelize.BOOLEAN,
    },
    onMarketAt: {
      type: Sequelize.DATE,
    },
  }, {
    underscored: true,
    tableName: 'user_things',
  });

  UserThing.associate = function (models) {
    UserThing.hasMany(models.Application, {
      as: 'ThingOffered',
      foreignKey: 'idThingOffered',
    });
    UserThing.hasMany(models.Application, {
      as: 'ThingDesired',
      foreignKey: 'idThingDesired',
    });
    UserThing.belongsTo(models.Thing, {
      foreignKey: 'thingId',
    });
    UserThing.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };

  return UserThing;
};
