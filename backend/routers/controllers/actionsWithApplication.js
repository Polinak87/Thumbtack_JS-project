'use strict';

const {
  Application,
  Thing,
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

  const currentApplication = await Application.findOne(
    {
      where: { id },
    },
  );

  if (currentApplication.status === 'pending') {
    await Application.update(
      {
        status: 'canceled',
      },
      { where: { id } },
    );

    ctx.body = {
      status: 'canceled',
      message: '',
    };
    ctx.status = 200;
  } else {
    ctx.body = {
      status: currentApplication.status,
      message: 'Ops, another user has just answered on your application for exchange this thing.',
    };
    ctx.status = 200;
  }
};

const rejectApplication = async (ctx) => {
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne(
    {
      where: { id },
    },
  );

  if (currentApplication.status === 'pending') {
    await Application.update(
      {
        status: 'rejected',
      },
      { where: { id } },
    );

    ctx.body = {
      status: 'rejected',
      message: '',
    };
    ctx.status = 200;
  } else {
    ctx.body = {
      status: currentApplication.status,
      message: 'Ops, the other user has just canceled the application.',
    };
    ctx.status = 200;
  }
};

const completeApplication = async (ctx) => {
  const { id } = ctx.request.body;

  const currentApplication = await Application.findOne(
    {
      where: { id },
    },
  );

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
      );

      await ctx.body.push(
        {
          id,
          status: 'completed',
          message: '',
        },
      );

      await Thing.update(
        {
          userId: idUserAnswer,
          onMarket: 'false',
          onMarketAt: null,
        },
        { where: { id: idThingOffered } },
      );

      await Thing.update(
        {
          userId: idUserAuthor,
          onMarket: 'false',
          onMarketAt: null,
        },
        { where: { id: idThingDesired } },
      );

      await Application.findAll(
        {
          where: {
            idThingOffered,
            status: 'pending',
          },
        },
      ).then((applications) => {
        ApplicationsForCancel = applications;
      });

      await Application.findAll(
        {
          where: {
            idThingDesired,
            status: 'pending',
          },
        },
      ).then((applications) => {
        ApplicationsForReject = applications;
      });

      for (let i = 0; i < ApplicationsForReject.length; i++) {
        await Application.update(
          {
            status: 'rejected',
          },
          { where: { id: ApplicationsForReject[i].dataValues.id } },
        );
        await ctx.body.push(
          {
            id: ApplicationsForReject[i].dataValues.id,
            status: 'rejected',
            message: '',
          },
        );
      }

      for (let i = 0; i < ApplicationsForCancel.length; i++) {
        await Application.update(
          {
            status: 'canceled',
          },
          { where: { id: ApplicationsForCancel[i].dataValues.id } },
        );
        if (ApplicationsForCancel[i].dataValues.idUserAnswer === ctx.state.user.id) {
          await ctx.body.push(
            {
              id: ApplicationsForCancel[i].dataValues.id,
              status: 'canceled',
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
          id,
          status: 'canceled',
          message: 'Very sorry, the other user has just canceled the application.',
        },
      );
      ctx.status = 200;
      break;

    case 'rejected':
      await ctx.body.push(
        {
          id,
          status: 'rejected',
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
