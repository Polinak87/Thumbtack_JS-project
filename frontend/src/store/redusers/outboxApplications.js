import { ADD_OUTBOX_APPLICATIONS } from '../actions/outboxApplications';
import { DELETE_OUTBOX_APPLICATIONS } from '../actions/outboxApplications';
import { DELETE_USER } from '../actions/user';

const defaultState = new Map();

const outboxApplications = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_OUTBOX_APPLICATIONS:
      return (
        new Map([ ...action.outboxApplications])
      )
    case DELETE_USER:
      return defaultState;
    case DELETE_OUTBOX_APPLICATIONS:
      return defaultState;
    default:
      return state
  }
}

export default outboxApplications;