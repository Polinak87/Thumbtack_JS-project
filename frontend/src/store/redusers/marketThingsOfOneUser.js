import { ADD_MARKET_THINGS_OF_ONE_USER } from '../actions/marketThingsOfOneUser';
import { DELETE_MARKET_THINGS_OF_ONE_USER} from '../actions/marketThingsOfOneUser';
import { DELETE_USER } from '../actions/user';

const defaultState = new Map();

const marketThingsOfOneUser = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MARKET_THINGS_OF_ONE_USER:
      return (
        new Map([ ...action.marketThingsOfOneUser])
      )
    case DELETE_USER:
      return defaultState;
    case DELETE_MARKET_THINGS_OF_ONE_USER:
      return defaultState;
    default:
      return state
  }
}

export default marketThingsOfOneUser;