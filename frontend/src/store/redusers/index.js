import { combineReducers } from 'redux';
import user from './user';
import userThings from './userThings';
import thingForExchange from './thingForExchange';

export default combineReducers({
  user,
  thingForExchange,
  userThings,
});