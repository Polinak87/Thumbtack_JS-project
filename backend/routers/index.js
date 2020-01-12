'use strict';

const Router = require('koa-router');

const { upload } = require('../middlewares/multer');

const {
  getCurrentUser,
  login,
  logout,
  registration,
} = require('./controllers/authorization');

const { getCategories } = require('./controllers/getCategories');

const {
  downloadNewThing,
  addThingFromCatalog,
  addRemoveThingFromMarket,
} = require('./controllers/actionsWithThings');

const {
  getInventoryThings,
  getMarketThings,
  getMarketThingsOfOneUser,
  getCatalogThings,
} = require('./controllers/getThings');

const {
  createApplication,
  cancelApplication,
  rejectApplication,
  completeApplication,
} = require('./controllers/actionsWithApplication');

const {
  applicationsOutbox,
  applicationsInbox,
} = require('./controllers/getApplications');

const router = new Router();

router.post('/api/registration', registration);
router.post('/api/login', login);
router.post('/api/logout', logout);
router.get('/api/user', getCurrentUser);

router.get('/api/categories', getCategories);

router.post('/api/userthings/from-catalog/:id', addThingFromCatalog);
router.post('/api/userthings', upload.single('file'), downloadNewThing);
router.put('/api/userthings/:id', addRemoveThingFromMarket);
router.get('/api/userthings/inventory', getInventoryThings);
router.get('/api/userthings/market', getMarketThings);
router.get('/api/userthings/market/by-user', getMarketThingsOfOneUser);
router.get('/api/things', getCatalogThings);

router.post('/api/applications', createApplication);
router.put('/api/applications/:id/cancel', cancelApplication);
router.put('/api/applications/:id/reject', rejectApplication);
router.put('/api/applications/:id/complete', completeApplication);
router.get('/api/applications/outbox', applicationsOutbox);
router.get('/api/applications/inbox', applicationsInbox);

module.exports = {
  router,
};

