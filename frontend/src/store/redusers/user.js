import { ADD_USER } from '../actions/user';

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
    default:
      return state
  }
}

export default user;