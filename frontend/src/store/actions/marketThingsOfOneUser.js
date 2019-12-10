export const ADD_MARKET_THINGS_OF_ONE_USER ='ADD_MARKET_THINGS_OF_ONE_USER';
export const DELETE_MARKET_THINGS_OF_ONE_USER ='DELETE_MARKET_THINGS_OF_ONE_USER';

export const addMarketThingsOfOneUser = marketThingsOfOneUser => ({
  type: ADD_MARKET_THINGS_OF_ONE_USER,
  marketThingsOfOneUser,
});

export const deleteMarketThingsOfOneUse = () => ({
  type: DELETE_MARKET_THINGS_OF_ONE_USER,
});