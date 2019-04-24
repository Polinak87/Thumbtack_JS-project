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
    category: {
      type: Sequelize.INTEGER(50),
    },
    userId: {
      type: Sequelize.INTEGER(50),
    },
    onMarket: {
      type: Sequelize.BOOLEAN,
    },
  }, {
    underscored: true,
    tableName: 'things',
  });

  Thing.associate = function (models) {
    Thing.belongsTo(models.User);
    // Thing.belongsToMany(models.Driver, {
    //   through: models.DriverCar
    // });
  };

  return Thing;
};
