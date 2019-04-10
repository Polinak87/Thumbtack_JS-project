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
      type: Sequelize.STRING(50),
    },
  }, {
    underscored: true,
    tableName: 'things',
  });

  // Thing.associate = function (models) {
  //   Thing.belongsToMany(models.Driver, {
  //     through: models.DriverCar
  //   });
  // };

  return Thing;
};
