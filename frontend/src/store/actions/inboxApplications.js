import axios from 'axios';

export const ADD_INBOX_APPLICATIONS = 'ADD_INBOX_APPLICATIONS';
export const DELETE_INBOX_APPLICATIONS = 'DELETE_OUTBOX_APPLICATIONS';

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
        response.data.forEach(function(thing) {
          map.set(thing.id, thing);
        });
        dispatch(addInboxApplications(map));
      });
  };
};

export const addInboxApplications = inboxApplications => ({
  type: ADD_INBOX_APPLICATIONS,
  inboxApplications,
});

export const deleteInboxApplications = () => ({
  type: DELETE_INBOX_APPLICATIONS,
});
