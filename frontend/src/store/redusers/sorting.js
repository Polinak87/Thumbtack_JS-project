import { ADD_SORTINGTYPE } from '../actions/sorting';
import { DELETE_SORTINGTYPE } from '../actions/sorting';
import { DELETE_USER } from '../actions/user';

const sorting = (state = {sortingType: 'DESC'}, action) => {
  switch (action.type) {
    case ADD_SORTINGTYPE:
      return (
        {
          ...action.sortingType,
        });
    case DELETE_SORTINGTYPE:
      return { sortingType: 'DESC' };
    case DELETE_USER:
      return {};
    default:
      return state
  }
}

export default sorting;