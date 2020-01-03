import { DELETE_USER } from '../actions/user';
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  ADD_CATEGORIES,
  ADD_SORTINGTYPE,
  DELETE_SORTINGTYPE,
  ADD_FILTRATIONTYPE,
  DELETE_FILTRATIONTYPE,
  ADD_FILTRATION_BY_USER,
  DELETE_FILTRATION_BY_USER,
} from '../actions/main';

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
      return {
        ...state,
        message: action.message,
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        message: {},
      };
    case ADD_CATEGORIES:
      return {
        ...state,
        categories: [...action.categoryList],
      };
    case ADD_SORTINGTYPE:
      return {
        ...state,
        sortByDate: action.type,
      };
    case DELETE_SORTINGTYPE:
      return {
        ...state,
        sortByDate: defaultState.sortByDate,
      };
    case ADD_FILTRATIONTYPE:
      return {
        ...state,
        filterByCategory: action.category,
      };
    case DELETE_FILTRATIONTYPE:
      return {
        ...state,
        filterByCategory: defaultState.filterByCategory,
      };
    case ADD_FILTRATION_BY_USER:
      return {
        ...state,
        filterbyUser: action.id,
      };
    case DELETE_FILTRATION_BY_USER:
      return {
        ...state,
        filterbyUser: defaultState.filterbyUser,
      };
    case DELETE_USER:
      return defaultState;
    default:
      return state;
  }
};

export default main;
