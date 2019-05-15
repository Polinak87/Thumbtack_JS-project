'use strict';

const {
  Thing,
  Category,
  Application,
} = require('../../models');

const applicationsOutbox = async (ctx, next) => {
  const currentUserId = ctx.state.user.id;

  ctx.body = await Application.findAll({
    include: [{
      model: Thing,
      as: 'ThingOffered',
      include: [{
        model: Category,
      }],
    }, {
      model: Thing,
      as: 'ThingDesired',
      include: [{
        model: Category,
      }],
    }],
    where: {
      idUserAuthor: currentUserId,
    },
  });
  ctx.status = 200;
};

const applicationsOutboxFiltered = async (ctx, next) => {
  const currentUserId = ctx.state.user.id;
  const statusForFilter = ctx.request.body.params.status;

  ctx.body = await Application.findAll({
    include: [{
      model: Thing,
      as: 'ThingOffered',
      include: [{
        model: Category,
      }],
    }, {
      model: Thing,
      as: 'ThingDesired',
      include: [{
        model: Category,
      }],
    }],
    where: {
      idUserAuthor: currentUserId,
      status: statusForFilter,
    },
  });
  ctx.status = 200;
};

const applicationsInbox = async (ctx, next) => {
  const currentUserId = ctx.state.user.id;

  ctx.body = await Application.findAll({
    include: [{
      model: Thing,
      as: 'ThingOffered',
      include: [{
        model: Category,
      }],
    }, {
      model: Thing,
      as: 'ThingDesired',
      include: [{
        model: Category,
      }],
    }],
    where: {
      idUserAnswer: currentUserId,
    },
  });
  ctx.status = 200;
};

const applicationsInboxFiltered = async (ctx, next) => {
  const currentUserId = ctx.state.user.id;
  const statusForFilter = ctx.request.body.params.status;

  ctx.body = await Application.findAll({
    include: [{
      model: Thing,
      as: 'ThingOffered',
      include: [{
        model: Category,
      }],
    }, {
      model: Thing,
      as: 'ThingDesired',
      include: [{
        model: Category,
      }],
    }],
    where: {
      idUserAnswer: currentUserId,
      status: statusForFilter,
    },
  });
  ctx.status = 200;
};

module.exports = {
  applicationsOutbox,
  applicationsOutboxFiltered,
  applicationsInbox,
  applicationsInboxFiltered,
};
