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
      // return Object.assign({}, { ...action.payload }); //работает, если есть только поле user
      return {};
    default:
      return state
  }
}

export default user;

