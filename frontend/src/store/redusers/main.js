import { ADD_MESSAGE } from '../actions/main';
import { DELETE_MESSAGE } from '../actions/main';
import { ADD_CATEGORIES } from '../actions/main';
import { ADD_SORTINGTYPE } from '../actions/main';
import { DELETE_SORTINGTYPE } from '../actions/main';
import { ADD_FILTRATIONTYPE } from '../actions/main';
import { DELETE_FILTRATIONTYPE } from '../actions/main';
import { ADD_FILTRATION_BY_USER } from '../actions/main';
import { DELETE_FILTRATION_BY_USER } from '../actions/main'
import { DELETE_USER } from '../actions/user';

const defaultState = {
  message: {},
  categories: [],
  sortByDate: { type: 'DESC' },
  filterByCategory: { category: 'all' },
  filterbyUser: {},
};

const main = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return (
        {
          ...state,
          message: action.message,
        });
    case DELETE_MESSAGE:
      return (
        {
          ...state,
          message: {},
        });
    case ADD_CATEGORIES:
      return ({
        ...state,
        categories: [...action.categoryList],
      });
    case ADD_SORTINGTYPE:
      return (
        {
          ...state,
          sortByDate: action.type,
        });
    case DELETE_SORTINGTYPE:
      return (
        {
          ...state,
          sortByDate: defaultState.sortByDate,
        });

    case ADD_FILTRATIONTYPE:
      return (
        {
          ...state,
          filterByCategory: action.category,
        });
    case DELETE_FILTRATIONTYPE:
      return (
        {
          ...state,
          filterByCategory: defaultState.filterByCategory,
        });
    case ADD_FILTRATION_BY_USER:
      return (
        {
          ...state,
          filterbyUser: action.id,
        });
    case DELETE_FILTRATION_BY_USER:
      return (
        {
          ...state,
          filterbyUser: defaultState.filterbyUser,
        });
    case DELETE_USER:
      return defaultState;
    default:
      return state;
  }
}

export default main;