import { combineReducers } from 'redux';
import main from './main';
import user from './user';
import things from './things';
import applications from './applications';

export default combineReducers({
  main,
  user,
  things,
  applications,
});