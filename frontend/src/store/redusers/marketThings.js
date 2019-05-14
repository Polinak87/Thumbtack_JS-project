import { ADD_MARKET_THINGS } from '../actions/marketThings';
import { DELETE_MARKET_THINGS} from '../actions/marketThings';
import { DELETE_USER } from '../actions/user';

const defaultState = new Map();

const marketThings = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MARKET_THINGS:
      return (
        new Map([ ...action.marketThings])
      )
    case DELETE_USER:
      return defaultState;
    case DELETE_MARKET_THINGS:
      return defaultState;
    default:
      return state
  }
}

export default marketThings;