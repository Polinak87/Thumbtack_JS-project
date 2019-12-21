'use strict';

const {
  Application,
  UserThing,
  Thing,
  Category,
} = require('../../models');

const createApplication = async (ctx) => {
  const { idThingOffered, idThingDesired, idUserAnswer } = ctx.request.body;
  const idUserAuthor = ctx.state.user.id;

  ctx.body = await Application.create({
    idUserAuthor,
    idThingOffered,
    idUserAnswer,
    idThingDesired,
    status: 'pending',
  });
  ctx.status = 200;
};

const canceleApplication = async (ctx) => {
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

  if (currentApplication.status === 'pending') {
    await Application.update(
      {
        status: 'canceled',
      },
      { where: { id } },
    )
      .then(() => {
        currentApplication.status = 'canceled';
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

  if (currentApplication.status === 'pending') {
    currentApplication.status = 'rejected';
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
    case 'pending':
      await Application.update(
        {
          status: 'completed',
        },
        { where: { id } },
      ).then(() => {
        currentApplication.status = 'completed';
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
          status: 'pending',
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
          status: 'pending',
        },
      })
        .then((applications) => {
          ApplicationsForReject = applications;
        });

      for (let i = 0; i < ApplicationsForReject.length; i++) {
        const ApplicationForReject = ApplicationsForReject[i].dataValues;

        await Application.update(
          {
            status: 'rejected',
          },
          { where: { id: ApplicationForReject.id } },
        )
          .then(() => {
            ApplicationForReject.status = 'rejected';
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
            status: 'canceled',
          },
          { where: { id: ApplicationForCancel.id } },
        )
          .then(() => {
            ApplicationForCancel.status = 'canceled';
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

    case 'canceled':
      await ctx.body.push(
        {
          application: currentApplication,
          message: 'Very sorry, the other user has just canceled the application.',
        },
      );
      ctx.status = 200;
      break;

    case 'rejected':
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
};
