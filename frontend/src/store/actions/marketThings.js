import axios from 'axios';
import { createMap } from '../../services/createMap';
export const ADD_MARKET_THINGS = 'ADD_MARKET_THINGS';
export const DELETE_MARKET_THINGS = 'DELETE_MARKET_THINGS';

// export const getMarketThings = (id) => {
//   return dispatch => {
//     console.log('filtrationType, sortingType');
//     console.log(id);
//     axios.get('/api/marketthings', {
//       params: {
//         filtrationType: 'all',
//         sortingType: 'ASC',
//       }
//     })
//       .then((response) => {
//         const { data } = response;
//         dispatch(addMarketThings(createMap(data)));
//       });
//   };
// };

export const addMarketThings = marketThings => ({
  type: ADD_MARKET_THINGS,
  marketThings,
});

export const deleteMarketThings = () => ({
  type: DELETE_MARKET_THINGS,
});