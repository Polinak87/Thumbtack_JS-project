import axios from 'axios';
import store from '../../store/index';
import { addMessage } from '../actions/message';

export const ADD_NEW_THING = 'ADD_NEW_THING';

export const addNewThing = (name, description, categoryId, file) => {
  return dispatch => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('description', description);
  formData.append('categoryId', categoryId);

  axios.post('/api/addnewthing', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      dispatch(setNewThing(response.data));
      store.dispatch(addMessage({ text: 'New thing is added to your inventory.'}));
    });
  };
}

export const setNewThing = newThing => ({
  type: ADD_NEW_THING,
  newThing,
});
