'use strict';

const { Category } = require('../models');

const categories = require('./categories.json');

Category.sync({ force: true }).then(async () => {
  for (let i = 0; i < categories.length; i++) {
    await Category.create(categories[i]);
  }
});

