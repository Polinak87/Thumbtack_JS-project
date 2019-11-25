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

  Category.associate = function (models) {
    Category.hasMany(models.Thing, {
      foreignKey: 'categoryId',
    });
  };

  return Category;
};
