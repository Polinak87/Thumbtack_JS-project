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
    const { Application, Thing, User } = models;

    UserThing.hasMany(Application, {
      as: 'ThingOffered',
      foreignKey: 'idThingOffered',
    });
    UserThing.hasMany(Application, {
      as: 'ThingDesired',
      foreignKey: 'idThingDesired',
    });
    UserThing.belongsTo(Thing, {
      foreignKey: 'thingId',
    });
    UserThing.belongsTo(User, {
      foreignKey: 'userId',
    });
  };

  return UserThing;
};
