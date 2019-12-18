import { ADD_USER_THINGS } from '../actions/userThings';
import { ADD_MARKET_THINGS } from '../actions/marketThings';
import { ADD_CATALOG } from '../actions/catalog';
import { ADD_MARKET_THINGS_OF_ONE_USER } from '../actions/marketThingsOfOneUser';
import { ADD_THING_FOR_EXCHANGE } from '../actions/thingForExchange';
import { DELETE_THING_FOR_EXCHANGE } from '../actions/thingForExchange';
import { ADD_NEW_THING } from '../actions/addNewThing';
import { DELETE_USER } from '../actions/user';
import { UPDATE_USER_THING } from '../actions/userThings';

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
    case ADD_NEW_THING:
      return (
        {
          ...state,
          userThings: new Map([...state.userThings, ...new Map([[action.newThing.id, action.newThing]]) ]),
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
