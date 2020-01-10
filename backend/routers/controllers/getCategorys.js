'use strict';

const { Category } = require('../../models');
const { checkAuthentication } = require('./authorization');

const getCategorys = async (ctx, next) => {
  await checkAuthentication(ctx);
  ctx.body = await Category.findAll();
  ctx.status = 200;
};

module.exports = {
  getCategorys,
};
