import { DELETE_USER } from '../actions/user';
import {
  ADD_INBOX_APPLICATIONS,
  ADD_OUTBOX_APPLICATIONS,
  UPDATE_INBOX_APPLICATIONS,
  UPDATE_OUTBOX_APPLICATIONS,
} from '../actions/applications';

const defaultState = {
  inbox: new Map(),
  outbox: new Map(),
};

const applications = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INBOX_APPLICATIONS:
      return {
        ...state,
        inbox: new Map([...action.inboxApplications]),
      };
    case ADD_OUTBOX_APPLICATIONS:
      return {
        ...state,
        outbox: new Map([...action.outboxApplications]),
      };
    case UPDATE_INBOX_APPLICATIONS:
      return {
        ...state,
        inbox: new Map([...state.inbox, ...action.updateddata]),
      };
    case UPDATE_OUTBOX_APPLICATIONS:
      return {
        ...state,
        outbox: new Map([...state.outbox, ...action.updateddata]),
      };
    case DELETE_USER:
      return defaultState;
    default:
      return state;
  }
};

export default applications;
