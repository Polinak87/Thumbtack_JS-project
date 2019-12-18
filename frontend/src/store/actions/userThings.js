import axios from 'axios';
import { createMap } from '../../services/createMap';

export const ADD_USER_THINGS = 'ADD_USER_THINGS';
export const UPDATE_USER_THING = 'UPDATE_USER_THING';

export const getUserThings = () => {
  return dispatch => {
    axios.get('/api/userthings')
      .then((response) => {
        const { data } = response;
        dispatch(addUserThings(createMap(data)));
      })
  };
};

export const addThingToMartet = (id) => {
  return dispatch => {
  axios.post('/api/addthingtomarket', { id })
    .then((response) => {
      dispatch(updateUserThing(response.data));
    });
  }
}

export const removeThingFromMartet = (id) => {
  return dispatch => {
  axios.post('/api/removethingfrommarket', { id })
    .then((response) => {
      dispatch(updateUserThing(response.data));
    });
  }
}

export const addUserThings = userThings => ({
  type: ADD_USER_THINGS,
  userThings,
});

export const updateUserThing = (userThing) => ({
  type: UPDATE_USER_THING,
  userThing,
});