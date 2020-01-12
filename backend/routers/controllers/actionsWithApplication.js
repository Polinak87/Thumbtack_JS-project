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
  ctx.status = 201;
};

const findApplication = (id) => {
  return Application.findOne({
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
};

const cancelApplication = async (ctx) => {
  await checkAuthentication(ctx);
  const { id } = ctx.params;

  const currentApplication = await findApplication(id);

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

  const { id } = ctx.params;
  const currentApplication = await findApplication(id);

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

const findApplicationsByCondition = (condition) => {
  return Application.findAll({
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
    where: condition,
  });
};

const updateApplications = async (array, status) => {
  const updatedArray = [];

  for (let i = 0; i < array.length; i++) {
    const ApplicationForUpdate = array[i].dataValues;

    await Application.update(
      {
        status,
      },
      { where: { id: ApplicationForUpdate.id } },
    )
      .then(() => {
        ApplicationForUpdate.status = status;
      });

    await updatedArray.push(
      {
        application: ApplicationForUpdate,
        message: '',
      },
    );
  }

  return updatedArray;
};

const completeApplication = async (ctx) => {
  await checkAuthentication(ctx);

  const { id } = ctx.params;
  const currentApplication = await findApplication(id);

  const {
    idUserAuthor,
    idThingOffered,
    idUserAnswer,
    idThingDesired,
    status,
  } = currentApplication;

  ctx.body = [];

  if (status === PENDING) {
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

    // Seach and processing applications, consist of exchanged userthings.
    // Such applications can't be completed. They are canceled or rejected.

    let applications = await findApplicationsByCondition({
      idThingOffered,
      status: PENDING,
    });

    let updatedApplications = await updateApplications(applications, REJECTED);

    ctx.body = [...ctx.body, ...updatedApplications];

    applications = await findApplicationsByCondition({
      idThingDesired,
      status: PENDING,
    });

    updatedApplications = await updateApplications(applications, CANCELED);

    ctx.body = [...ctx.body, ...updatedApplications];
    ctx.status = 200;
  }

  if (status === CANCELED) {
    await ctx.body.push(
      {
        application: currentApplication,
        message: 'Very sorry, the other user has just canceled the application.',
      },
    );
    ctx.status = 200;
  }

  if (status === REJECTED) {
    await ctx.body.push(
      {
        application: currentApplication,
        message: 'Ops, another user has just accepted your application for exchange this thing. This application is automatically canceled.',
      },
    );
    ctx.status = 200;
  }
};

module.exports = {
  createApplication,
  cancelApplication,
  rejectApplication,
  completeApplication,
  PENDING,
  CANCELED,
  REJECTED,
  COMPLETED,
};
