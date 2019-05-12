'use strict';

const { Category } = require('../../models');

const getCategorys = async (ctx, next) => {
  ctx.body = await Category.findAll();
  ctx.status = 200;
};

module.exports = {
  getCategorys,
};
