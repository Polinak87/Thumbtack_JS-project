'use strict';

const urlapi = require('url');
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
  const query = urlapi.parse(ctx.request.url).query;
  const statusForFilter = query.substring((query.indexOf('=') + 1), query.length);

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
  const query = urlapi.parse(ctx.request.url).query;
  const statusForFilter = query.substring((query.indexOf('=') + 1), query.length);

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
