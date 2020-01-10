'use strict';

const PENDING = 'pending';
const CANCELED = 'canceled';
const REJECTED = 'rejected';
const COMPLETED = 'completed';

const {
  Application,
  UserThing,
  Thing,
  Category,
} = require('../../models');

const { checkAuthentication } = require('./authorization');

const createApplication = async (ctx) => {
  await checkAuthentication(ctx);
  const { idThingOffered, idThingDesired, idUserAnswer } = ctx.request.body;
  const idUserAuthor = ctx.state.user.id;

  ctx.body = await Application.create({
    idUserAuthor,
    idThingOffered,
    idUserAnswer,
    idThingDesired,
    status: PENDING,
  });
  ctx.status = 200;
};

const canceleApplication = async (ctx) => {
  await checkAuthentication(ctx);
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne({
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
    where: { id },
  });

  if (currentApplication.status === PENDING) {
    await Application.update(
      {
        status: CANCELED,
      },
      { where: { id } },
    )
      .then(() => {
        currentApplication.status = CANCELED;
        ctx.body = {
          currentApplication,
          message: '',
        };
        ctx.status = 200;
      });
  } else {
    ctx.body = {
      currentApplication,
      message: 'Ops, another user has just answered on your application for exchange this thing.',
    };
    ctx.status = 200;
  }
};

const rejectApplication = async (ctx) => {
  await checkAuthentication(ctx);
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne({
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
    where: { id },
  });

  if (currentApplication.status === PENDING) {
    currentApplication.status = REJECTED;
    currentApplication.save();
    ctx.body = {
      currentApplication,
      message: '',
    };
    ctx.status = 200;
  } else {
    ctx.body = {
      currentApplication,
      message: 'Ops, the other user has just canceled the application.',
    };
    ctx.status = 200;
  }
};

const completeApplication = async (ctx) => {
  await checkAuthentication(ctx);
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne({
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
    where: { id },
  });

  const {
    idUserAuthor,
    idThingOffered,
    idUserAnswer,
    idThingDesired,
    status,
  } = currentApplication;

  let ApplicationsForReject;
  let ApplicationsForCancel;

  ctx.body = [];

  switch (status) {
    case PENDING:
      await Application.update(
        {
          status: COMPLETED,
        },
        { where: { id } },
      ).then(() => {
        currentApplication.status = COMPLETED;
      });

      await ctx.body.push(
        {
          application: currentApplication,
          message: '',
        },
      );

      await UserThing.update(
        {
          userId: idUserAnswer,
          onMarket: 'false',
          onMarketAt: null,
        },
        { where: { id: idThingOffered } },
      );

      await UserThing.update(
        {
          userId: idUserAuthor,
          onMarket: 'false',
          onMarketAt: null,
        },
        { where: { id: idThingDesired } },
      );

      await Application.findAll({
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
          idThingOffered,
          status: PENDING,
        },
      })
        .then((applications) => {
          ApplicationsForCancel = applications;
        });

      await Application.findAll({
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
          idThingDesired,
          status: PENDING,
        },
      })
        .then((applications) => {
          ApplicationsForReject = applications;
        });

      for (let i = 0; i < ApplicationsForReject.length; i++) {
        const ApplicationForReject = ApplicationsForReject[i].dataValues;

        await Application.update(
          {
            status: REJECTED,
          },
          { where: { id: ApplicationForReject.id } },
        )
          .then(() => {
            ApplicationForReject.status = REJECTED;
          });

        await ctx.body.push(
          {
            application: ApplicationForReject,
            message: '',
          },
        );
      }

      for (let i = 0; i < ApplicationsForCancel.length; i++) {
        const ApplicationForCancel = ApplicationsForCancel[i].dataValues;

        await Application.update(
          {
            status: CANCELED,
          },
          { where: { id: ApplicationForCancel.id } },
        )
          .then(() => {
            ApplicationForCancel.status = CANCELED;
          });

        if (ApplicationForCancel.idUserAnswer === ctx.state.user.id) {
          await ctx.body.push(
            {
              application: ApplicationForCancel,
              message: '',
            },
          );
        }
      }

      ctx.status = 200;
      break;

    case CANCELED:
      await ctx.body.push(
        {
          application: currentApplication,
          message: 'Very sorry, the other user has just canceled the application.',
        },
      );
      ctx.status = 200;
      break;

    case REJECTED:
      await ctx.body.push(
        {
          application: currentApplication,
          message: 'Ops, another user has just accepted your application for exchange this thing. This application is automatically canceled.',
        },
      );
      ctx.status = 200;
      break;

    default:
    {
      ctx.status = 200;
      break;
    }
  }
};

module.exports = {
  createApplication,
  canceleApplication,
  rejectApplication,
  completeApplication,
  PENDING,
  CANCELED,
  REJECTED,
  COMPLETED,
};
