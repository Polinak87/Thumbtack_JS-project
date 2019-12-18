import { ADD_INBOX_APPLICATIONS } from '../actions/inboxApplications';
import { ADD_OUTBOX_APPLICATIONS } from '../actions/outboxApplications';
import { DELETE_USER } from '../actions/user';

const defaultState = {
  inbox: new Map(),
  outbox: new Map(),
};

const applications = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INBOX_APPLICATIONS:
      return (
        {
          ...state,
          inbox: new Map([...action.inboxApplications]),
        });
    case ADD_OUTBOX_APPLICATIONS:
      return (
        {
          ...state,
          outbox: new Map([...action.outboxApplications])
        });
    case DELETE_USER:
      return defaultState;
    default:
      return state
  }
}

export default applications;