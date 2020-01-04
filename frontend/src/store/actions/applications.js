import axios from 'axios';
import { createMap } from '../../services/createMap';
import { addMessage } from './main';

export const ADD_INBOX_APPLICATIONS = 'ADD_INBOX_APPLICATIONS';
export const ADD_OUTBOX_APPLICATIONS = 'ADD_OUTBOX_APPLICATIONS';
export const UPDATE_INBOX_APPLICATIONS = 'UPDATE_INBOX_APPLICATIONS';
export const UPDATE_OUTBOX_APPLICATIONS = 'UPDATE_OUTBOX_APPLICATIONS';

export const createApplication = (idThingOffered, idThingDesired, idUserAnswer) => {
  return dispatch => {
    axios
      .post('/api/createapplication', { idThingOffered, idThingDesired, idUserAnswer })
      .then(response => {
        const { data } = response;
        updateOutboxApplications(createMap(data));
        dispatch(
          addMessage({
            text: ' Your application is sent. You can track it in your outbox applications.',
          }),
        );
      });
  };
};

export const getInboxApplications = status => {
  return dispatch => {
    axios
      .get('/api/applicationsinbox', {
        params: {
          status,
        },
      })
      .then(response => {
        const { data } = response;
        dispatch(addInboxApplications(createMap(data)));
      });
  };
};

export const getOutboxApplications = status => {
  return dispatch => {
    axios
      .get('/api/applicationsoutbox', {
        params: {
          status,
        },
      })
      .then(response => {
        const { data } = response;
        dispatch(addOutboxApplications(createMap(data)));
      });
  };
};

export const rejectApplication = id => {
  return dispatch => {
    axios.put('/api/rejectapplication', { id }).then(response => {
      const { currentApplication, message } = response.data;
      dispatch(updateInboxApplications(createMap(currentApplication)));
      if (message !== '') {
        dispatch(addMessage({ text: message }));
      }
    });
  };
};
export const cancelApplication = id => {
  return dispatch => {
    axios.put('/api/canceleapplication', { id }).then(response => {
      const { currentApplication, message } = response.data;
      dispatch(updateOutboxApplications(createMap(currentApplication)));
      if (message !== '') {
        dispatch(addMessage({ text: message }));
      }
    });
  };
};

export const completeApplication = id => {
  return dispatch => {
    axios.put('/api/completeapplication', { id }).then(response => {
      let { data } = response;
      let arrayForUpdate = [];
      for (let i = 0; i < data.length; i++) {
        const { application, message } = data[i];
        arrayForUpdate.push(application);
        if (message !== '') {
          dispatch(addMessage({ text: message }));
        }
      }
      dispatch(updateInboxApplications(createMap(arrayForUpdate)));
    });
  };
};

export const addInboxApplications = inboxApplications => ({
  type: ADD_INBOX_APPLICATIONS,
  inboxApplications,
});

export const addOutboxApplications = outboxApplications => ({
  type: ADD_OUTBOX_APPLICATIONS,
  outboxApplications,
});

export const updateOutboxApplications = updateddata => ({
  type: UPDATE_OUTBOX_APPLICATIONS,
  updateddata,
});

export const updateInboxApplications = updateddata => ({
  type: UPDATE_INBOX_APPLICATIONS,
  updateddata,
});
