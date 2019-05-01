import { ADD_USER } from '../actions/user';
import { DELETE_USER } from '../actions/user';

const user = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      return (
        {
          ...action.user,
        });
      // return [
      //   ...state,
      //     {
      //       ...action.user,
      //     }];
    case DELETE_USER:
      return {
        ...state, user: null,
          };
    default:
      return state
  }
}

export default user;