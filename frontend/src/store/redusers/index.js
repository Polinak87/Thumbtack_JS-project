import { combineReducers } from 'redux';
import main from './main';
import things from './things';
import user from './user';

import outboxApplications from './outboxApplications';
import inboxApplications from './inboxApplications';
import addNewThing from './addNewThing';

export default combineReducers({
  main,
  user,
  things,

  outboxApplications,
  inboxApplications,

  addNewThing,
});