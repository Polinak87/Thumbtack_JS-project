import { ADD_CATALOG } from '../actions/catalog';
import { DELETE_CATALOG } from '../actions/catalog';
import { DELETE_USER } from '../actions/user';

const defaultState = new Map();

const catalog = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CATALOG:
      return (
          new Map([ ...action.catalog])
        );
    case DELETE_CATALOG:
      return {};
    case DELETE_USER:
      return {};
    default:
      return state
  }
}

export default catalog;