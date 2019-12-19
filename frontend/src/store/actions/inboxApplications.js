import axios from 'axios';
import { createMap } from '../../services/createMap';
import addMessage from './message';

export const ADD_INBOX_APPLICATIONS = 'ADD_INBOX_APPLICATIONS';
export const UPDATE_INBOX_APPLICATIONS = 'DELETE_OUTBOX_APPLICATIONS';

export const getInboxApplications = status => {
  return dispatch => {
    axios
      .get('/api/applicationsinbox', {
        params: {
          status,
        },
      })
      .then(response => {
        var map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing);
        });
        dispatch(addInboxApplications(map));
      });
  };
};

export const rejectApplication = id => {
  return dispatch => {
    axios.put('/api/rejectapplication', { id }).then(response => {
      // console.log('response.data');
      // console.log(response.data);
      const { currentApplication, message } = response.data;
      // console.log(createMap(currentApplication));
      dispatch(updateInboxApplications(createMap(currentApplication)));
      if (message !== '') {
        dispatch(addMessage({ text: response.data.message }));
      }
    });
  }
}

export const updateInboxApplications = updateddata => ({
  type: UPDATE_INBOX_APPLICATIONS,
  updateddata,
});

export const addInboxApplications = inboxApplications => ({
  type: ADD_INBOX_APPLICATIONS,
  inboxApplications,
});

