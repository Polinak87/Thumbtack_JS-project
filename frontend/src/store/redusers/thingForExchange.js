import { ADD_THING_FOR_EXCHANGE } from '../actions/thingForExchange';
import { DELETE_THING_FOR_EXCHANGE } from '../actions/thingForExchange';
import { DELETE_USER } from '../actions/user';

const thingForExchange = (state = {}, action) => {
  switch (action.type) {
    case ADD_THING_FOR_EXCHANGE:
      return (
        {
          ...action.thingForExchange,
        });
    case DELETE_THING_FOR_EXCHANGE:
      return {};
    case DELETE_USER:
      return {};
    default:
      return state
  }
}

export default thingForExchange;

