import { ADD_INBOX_APPLICATIONS } from '../actions/inboxApplications';
import { DELETE_INBOX_APPLICATIONS } from '../actions/inboxApplications';
import { DELETE_USER } from '../actions/user';

const defaultState = new Map();

const inboxApplications = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INBOX_APPLICATIONS:
      return (
        new Map([ ...action.inboxApplications])
      )
    case DELETE_USER:
      return defaultState;
    case DELETE_INBOX_APPLICATIONS:
      return defaultState;
    default:
      return state
  }
}

export default inboxApplications;