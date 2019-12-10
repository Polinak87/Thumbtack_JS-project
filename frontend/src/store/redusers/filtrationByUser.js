import { ADD_FILTRATION_BY_USER } from '../actions/filtration';
import { DELETE_FILTRATION_BY_USER } from '../actions/filtration'
import { DELETE_USER } from '../actions/user';

const filtrationByUser = (state = {}, action) => {
  switch (action.type) {
    case ADD_FILTRATION_BY_USER:
      return (
        {
          ...action.filtrationByUser,
        });
    case DELETE_FILTRATION_BY_USER:
      return {};
    case DELETE_USER:
      return {};
    default:
      return state
  }
}

export default filtrationByUser;