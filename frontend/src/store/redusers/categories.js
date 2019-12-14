import { ADD_CATEGORIES } from '../actions/categories';
import { DELETE_CATEGORIES } from '../actions/categories';
import { DELETE_USER } from '../actions/user';

const defaultState = [];
const categories = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CATEGORIES:
      return (
        [...action.categoryList]
      );        
    case DELETE_CATEGORIES:
      return [];
    case DELETE_USER:
      return [];
    default:
      return state
  }
}

export default categories;