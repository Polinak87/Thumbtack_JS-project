import { ADD_USER_THINGS } from '../actions/userThings';
import { DELETE_USER_THINGS} from '../actions/userThings';
import { DELETE_USER } from '../actions/user';

const defaultState = new Map();

const userThings = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_USER_THINGS:
      return (
        new Map([...action.userThings])
      )
    case DELETE_USER:
      return defaultState;
    case DELETE_USER_THINGS:
      return defaultState;
    default:
      return state
  }
}

export default userThings;

