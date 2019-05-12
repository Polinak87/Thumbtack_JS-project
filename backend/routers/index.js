'use strict';

const Router = require('koa-router');

const {
  // getCurrentUser,
  login,
  logout,
  registration,
} = require('./controllers/authorization');

const { getCategorys } = require('./controllers/getCategorys');

const {
  addNewThing,
  addThingToMarket,
  removeThingFromMarket,
} = require('./controllers/actionsWithThings');

const {
  getUserThings,
  getMarketThings,
} = require('./controllers/getThings');

const {
  createApplication,
  canceleApplication,
  rejectApplication,
  completeApplication,
} = require('./controllers/actionsWithApplication');

const {
  applicationsOutbox,
  applicationsOutboxFiltered,
  applicationsInbox,
  applicationsInboxFiltered,
} = require('./controllers/getApplications');

const router = new Router();

router.post('/api/registration', registration);
router.post('/api/login', login);
router.post('/api/logout', logout);

router.get('/api/category', getCategorys);

router.post('/api/addnewthing', addNewThing);
router.post('/api/addthingtomarket', addThingToMarket);
router.post('/api/removethingfrommarket', removeThingFromMarket);

router.get('/api/userthings', getUserThings);
router.get('/api/marketthings', getMarketThings);

router.post('/api/createapplication', createApplication);
router.put('/api/canceleapplication', canceleApplication);
router.put('/api/rejectapplication', rejectApplication);
router.put('/api/completeapplication', completeApplication);

router.get('/api/applicationsoutbox', applicationsOutbox);
router.post('/api/applicationsoutboxfiltered', applicationsOutboxFiltered);
router.get('/api/applicationsinbox', applicationsInbox);
router.post('/api/applicationinsboxfiltered', applicationsInboxFiltered);

module.exports = {
  router,
};

// const {
//   sequelize,
//   Thing,
//   User,
//   Category,
//   Application,
// } = require('../models');
//
// sequelize.sync({ force: true }).then(async () => {
//   await Category.create({ name: 'dresses' });
//   await Category.create({ name: 'skirts' });
//   await Category.create({ name: 'blouses' });
//   await User.create({
//     firstName: 'Polina',
//     lastName: 'Kozlova',
//     email: 'polinacheez@gmail.com',
//     password: 'ggg',
//   });
//   await User.create({
//     firstName: 'Anna',
//     lastName: 'Mitrofanova',
//     email: 'mitroshka@mail.com',
//     password: 'ggg',
//   });
//   await Thing.create({
//     name: 'summer dress',
//     description: 'pretty',
//     categoryId: '1',
//     userId: '1',
//     onMarket: false,
//     onMarketAt: null,
//   });
//   await Thing.create({
//     name: 'summer dress',
//     description: 'light',
//     categoryId: '1',
//     userId: '2',
//     onMarket: false,
//     onMarketAt: null,
//   });
//   await Application.create({
//     idApplicationOutbox: 1,
//     idUserAuthor: 1,
//     idThingOffered: 1,
//     idApplicationInbox: 1,
//     idUserAnswer: 2,
//     idThingDesired: 2,
//     status: 'pending',
//   });
// });
