import { ADD_USER_THINGS } from '../actions/things';
import { UPDATE_USER_THING } from '../actions/things';
import { ADD_THING_FOR_EXCHANGE } from '../actions/things';
import { DELETE_THING_FOR_EXCHANGE } from '../actions/things';
import { ADD_MARKET_THINGS } from '../actions/things';
import { ADD_MARKET_THINGS_OF_ONE_USER } from '../actions/things';
import { ADD_CATALOG } from '../actions/things';
import { DELETE_USER } from '../actions/user';

const defaultState = {
  userThings: new Map(),
  marketThings: new Map(),
  marketThingsOfOneUser: new Map(),
  catalog: new Map(),
  thingForExchange: {},
};

const things = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_USER_THINGS:
      return (
        {
          ...state,
          userThings: new Map([...action.userThings]),
        });
    case UPDATE_USER_THING:
      return (
        {
          ...state,
          userThings: new Map([...state.userThings, ...new Map([[action.userThing.id, action.userThing]]) ]),
        });
    case ADD_MARKET_THINGS:
      return (
        {
          ...state,
          marketThings: new Map([...action.marketThings]),
        });
    case ADD_CATALOG:
      return (
        {
          ...state,
          catalog: new Map([...action.catalog]),
        });
    case ADD_MARKET_THINGS_OF_ONE_USER:
      return (
        {
          ...state,
          marketThingsOfOneUser: new Map([...action.marketThingsOfOneUser]),
        });
    case ADD_THING_FOR_EXCHANGE:
      return (
        {
          ...state,
          thingForExchange: action.thingForExchange,
        });
    case DELETE_THING_FOR_EXCHANGE:
      return (
        {
          ...state,
          thingForExchange: defaultState.thingForExchange,
        });
    case DELETE_USER:
      return defaultState;
    default:
      return state
  }
}

export default things;
