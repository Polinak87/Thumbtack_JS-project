import { ADD_NEW_THING } from '../actions/addNewThing';
import { DELETE_USER } from '../actions/user';

const catalog = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_THING:
      return {}
    case DELETE_USER:
      return {};
    default:
      return state
  }
}

export default catalog;