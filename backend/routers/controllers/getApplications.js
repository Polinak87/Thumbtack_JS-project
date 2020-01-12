'use strict';

const {
  Thing,
  Category,
  Application,
  UserThing,
} = require('../../models');

const { checkAuthentication } = require('./authorization');

const applicationsOutbox = async (ctx, next) => {
  await checkAuthentication(ctx);
  const currentUserId = ctx.state.user.id;
  const query = ctx.request.querystring;
  const params = new URLSearchParams(query);
  const statusForFilter = params.get('status');

  if (!statusForFilter.localeCompare('all')) {
    ctx.body = await Application.findAll({
      include: [{
        model: UserThing,
        as: 'ThingOffered',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }, {
        model: UserThing,
        as: 'ThingDesired',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }],
      where: {
        idUserAuthor: currentUserId,
      },
    });
    ctx.status = 200;
  } else {
    ctx.body = await Application.findAll({
      include: [{
        model: UserThing,
        as: 'ThingOffered',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }, {
        model: UserThing,
        as: 'ThingDesired',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }],
      where: {
        idUserAuthor: currentUserId,
        status: statusForFilter,
      },
    });
    ctx.status = 200;
  }
};

const applicationsInbox = async (ctx, next) => {
  await checkAuthentication(ctx);
  const currentUserId = ctx.state.user.id;
  const query = ctx.request.querystring;
  const params = new URLSearchParams(query);
  const statusForFilter = params.get('status');

  if (!statusForFilter.localeCompare('all')) {
    ctx.body = await Application.findAll({
      include: [{
        model: UserThing,
        as: 'ThingOffered',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }, {
        model: UserThing,
        as: 'ThingDesired',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }],
      where: {
        idUserAnswer: currentUserId,
      },
    });
    ctx.status = 200;
  } else {
    ctx.body = await Application.findAll({
      include: [{
        model: UserThing,
        as: 'ThingOffered',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }, {
        model: UserThing,
        as: 'ThingDesired',
        include: [{
          model: Thing,
          include: [{
            model: Category,
          }],
        }],
      }],
      where: {
        idUserAnswer: currentUserId,
        status: statusForFilter,
      },
    });
    ctx.status = 200;
  }
};

module.exports = {
  applicationsOutbox,
  applicationsInbox,
};
