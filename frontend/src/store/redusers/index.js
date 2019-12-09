import { combineReducers } from 'redux';
import user from './user';
import thingForExchange from './thingForExchange';
import userThings from './userThings';
import marketThings from './marketThings';
import outboxApplications from './outboxApplications';
import inboxApplications from './inboxApplications';
import message from './message';
import sorting from './sorting';
import filtration from './filtration';

export default combineReducers({
  user,
  thingForExchange,
  userThings,
  marketThings,
  outboxApplications,
  inboxApplications,
  message,
  sorting,
  filtration,
});