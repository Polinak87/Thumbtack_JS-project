import { combineReducers } from 'redux';
import user from './user';
import thingForExchange from './thingForExchange';
import userThings from './userThings';
import marketThings from './marketThings';
import marketThingsOfOneUser from './marketThingsOfOneUser';
import outboxApplications from './outboxApplications';
import inboxApplications from './inboxApplications';
import message from './message';
import sorting from './sorting';
import filtration from './filtration';
import filtrationByUser from './filtrationByUser';
import catalog from './catalog';
import categories from './categories';


export default combineReducers({
  user,
  thingForExchange,
  userThings,
  marketThings,
  marketThingsOfOneUser,
  outboxApplications,
  inboxApplications,
  message,
  sorting,
  filtration,
  filtrationByUser,
  catalog,
  categories,
});