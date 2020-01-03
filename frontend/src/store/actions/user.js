import axios from 'axios';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

export const registration = (firstName, lastName, email, password) => {
  return dispatch => {
    return axios
      .post('/api/registration', { firstName, lastName, email, password })
      .then(response => {
        const { data } = response;
        dispatch(addUser(data));
      });
  };
};

export const login = (email, password) => {
  return dispatch => {
    return axios
      .post('/api/login', { email, password })
      .then(response => {
        const { data } = response;
        dispatch(addUser(data));
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios.post('/api/logout').then(() => {
        dispatch(deleteUser());
    });
  };
};

export const getCurrentUser = () => {
  return dispatch => {
    return axios.get('api/getcurrentuser').then(response => {
      const { data } = response;
      dispatch(addUser(data));
    });
  };
};

export const addUser = user => ({
  type: ADD_USER,
  user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});
