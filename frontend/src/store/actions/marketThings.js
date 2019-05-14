export const ADD_MARKET_THINGS ='ADD_MARKET_THINGS';
export const DELETE_MARKET_THINGS ='DELETE_MARKET_THINGS';

export const addMarketThings = marketThings => ({
  type: ADD_MARKET_THINGS,
  marketThings,
});

export const deleteMarketThings = () => ({
  type: DELETE_MARKET_THINGS,
});