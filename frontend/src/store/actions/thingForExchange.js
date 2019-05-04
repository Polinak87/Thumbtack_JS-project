export const ADD_THING_FOR_EXCHANGE ='ADD_THING_FOR_EXCHANGE';
export const DELETE_THING_FOR_EXCHANGE ='DELETE_THING_FOR_EXCHANGE';

export const addThingForExchange = (thingForExchange) => ({
  type: ADD_THING_FOR_EXCHANGE,
  thingForExchange,
});

export const deleteThingForExchange = () => ({
  type: DELETE_THING_FOR_EXCHANGE,
});