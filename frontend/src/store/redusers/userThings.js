'use strict';

import { ADD_USER_THINGS } from '../actions/userThings';
import { DELETE_USER_THINGS} from '../actions/userThings';
import { DELETE_USER } from '../actions/user';

const userThings = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER_THINGS:
      return [
        state,
        {
        ...action.userThings,
        }];
    case DELETE_USER:
      return {};
    case DELETE_USER_THINGS:
      return {};
    default:
      return state
  }
}

export default userThings;

      // return [
      //   ...state,
      //     {
      //       ...action.user,
      //     }];
