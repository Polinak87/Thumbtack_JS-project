'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    name: {
      type: Sequelize.STRING(50),
    },
  }, {
    underscored: true,
    tableName: 'category',
  });

  // Thing.associate = function (models) {
  //   Thing.belongsToMany(models.Driver, {
  //     through: models.DriverCar
  //   });
  // };

  return Category;
};
