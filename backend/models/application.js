'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Application = sequelize.define('Application', {
    idUserAuthor: {
      type: Sequelize.INTEGER(50),
    },
    idThingOffered: {
      type: Sequelize.INTEGER(50),
    },
    idUserAnswer: {
      type: Sequelize.INTEGER(50),
    },
    idThingDesired: {
      type: Sequelize.INTEGER(50),
    },
    status: {
      type: Sequelize.STRING(50),
    },
  }, {
    underscored: true,
    tableName: 'application',
  });

  Application.associate = function (models) {
    const { UserThing } = models;

    Application.belongsTo(UserThing, {
      as: 'ThingOffered',
      foreignKey: 'idThingOffered',
    });
    Application.belongsTo(UserThing, {
      as: 'ThingDesired',
      foreignKey: 'idThingDesired',
    });
  };

  return Application;
};
