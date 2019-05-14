import { ADD_MESSAGE } from '../actions/message';
import { DELETE_MESSAGE } from '../actions/message';

const message = (state = {}, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return (
        {
          ...action.message,
        });
    case DELETE_MESSAGE:
      return {};
    default:
      return state
  }
}

export default message;