import axios from 'axios';
import { addMessage } from '../actions/main';
import { createMap } from '../../services/createMap';

export const ADD_THING_FOR_EXCHANGE = 'ADD_THING_FOR_EXCHANGE';
export const DELETE_THING_FOR_EXCHANGE = 'DELETE_THING_FOR_EXCHANGE';
export const ADD_USER_THINGS = 'ADD_USER_THINGS';
export const UPDATE_USER_THING = 'UPDATE_USER_THING';
export const ADD_MARKET_THINGS = 'ADD_MARKET_THINGS';
export const ADD_MARKET_THINGS_OF_ONE_USER = 'ADD_MARKET_THINGS_OF_ONE_USER';
export const ADD_CATALOG = 'ADD_CATALOG';

export const addNewThing = (name, description, categoryId, file) => {
  return dispatch => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('categoryId', categoryId);

    axios
      .post('/api/addnewthing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        const { data } = response;
        dispatch(updateUserThing(data));
        dispatch(addMessage({ text: 'New thing is added to your inventory.' }));
      });
  };
};

export const addThingFromCatalog = id => {
  return dispatch => {
    axios.post('api/addthingfromcatalog', { id }).then(response => {
      const { data } = response;
      dispatch(updateUserThing(data));
      dispatch(addMessage({ text: 'Thing is added to your inventory.' }));
    });
  };
};

export const addThingForExchange = thingForExchange => ({
  type: ADD_THING_FOR_EXCHANGE,
  thingForExchange,
});

export const deleteThingForExchange = () => ({
  type: DELETE_THING_FOR_EXCHANGE,
});

export const getUserThings = () => {
  return dispatch => {
    axios.get('/api/userthings').then(response => {
      const { data } = response;
      dispatch(addUserThings(createMap(data)));
    });
  };
};

export const addThingToMartet = id => {
  return dispatch => {
    axios.put('/api/addthingtomarket', { id }).then(response => {
      const { data } = response;
      dispatch(updateUserThing(data));
    });
  };
};

export const removeThingFromMartet = id => {
  return dispatch => {
    axios.put('/api/removethingfrommarket', { id }).then(response => {
      const { data } = response;
      dispatch(updateUserThing(data));
    });
  };
};

export const addUserThings = userThings => ({
  type: ADD_USER_THINGS,
  userThings,
});

export const updateUserThing = userThing => ({
  type: UPDATE_USER_THING,
  userThing,
});

export const getMarketThings = (filtrationType, sortingType) => {
  return dispatch => {
    axios
      .get('/api/marketthings', {
        params: {
          filtrationType,
          sortingType,
        },
      })
      .then(response => {
        const { data } = response;
        dispatch(addMarketThings(createMap(data)));
      });
  };
};

export const addMarketThings = marketThings => ({
  type: ADD_MARKET_THINGS,
  marketThings,
});

export const getMarketThingsOfOneUser = user => {
  return dispatch => {
    axios
      .get('/api/marketthingsfilteredbyuser', {
        params: {
          user,
        },
      })
      .then(response => {
        const { data } = response;
        dispatch(addMarketThingsOfOneUser(createMap(data)));
      });
  };
};

export const addMarketThingsOfOneUser = marketThingsOfOneUser => ({
  type: ADD_MARKET_THINGS_OF_ONE_USER,
  marketThingsOfOneUser,
});

export const getCatalog = () => {
  return dispatch => {
    axios.get('/api/catalog').then(response => {
      const { data } = response;
      dispatch(addCatalog(createMap(data)));
    });
  };
};

export const addCatalog = catalog => ({
  type: ADD_CATALOG,
  catalog,
});
