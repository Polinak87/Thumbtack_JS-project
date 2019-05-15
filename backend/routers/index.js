'use strict';

const Router = require('koa-router');

const {
  getCurrentUser,
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
router.get('/api/getcurrentuser', getCurrentUser);

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
router.post('/api/applicationsinboxfiltered', applicationsInboxFiltered);

module.exports = {
  router,
};

