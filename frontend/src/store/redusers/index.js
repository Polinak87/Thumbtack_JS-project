import { combineReducers } from 'redux';
import user from './user';
import thingForExchange from './thingForExchange';

export default combineReducers({
  user,
  thingForExchange,
});