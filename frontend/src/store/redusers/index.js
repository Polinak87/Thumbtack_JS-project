import { combineReducers } from 'redux';
import user from './user';
import thingForExchange from './thingForExchange';
import userThings from './userThings';
import marketThings from './marketThings';
import outboxApplications from './outboxApplications';
import inboxApplications from './inboxApplications';

export default combineReducers({
  user,
  thingForExchange,
  userThings,
  marketThings,
  outboxApplications,
  inboxApplications,
});