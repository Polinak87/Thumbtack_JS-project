import axios from 'axios';
import { addMessage } from '../actions/main';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

export const registration = (firstName, lastName, email, password, props) => {
  return dispatch => {
    axios
      .post('/api/registration', { firstName, lastName, email, password })
      .then(response => {
          dispatch(addUser(response.data));
          props.history.push('/profile');
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(addMessage({ text: error.response.data }));
        } else {
          dispatch(addMessage({ text: 'Something is wrang. Try again or contact technical support.' }));
        }
      });
  }
}

export const login = (email, password, props) => {
  return dispatch => {
    axios
      .post('/api/login', { email, password })
      .then(response => {
          dispatch(addUser(response.data));
          props.history.push("/profile");
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          dispatch(addMessage({ text: error.response.data }));
        } else {
          dispatch(addMessage({ text: 'Something is wrang. Try again or contact technical support.' }));
        }
      });
  }
}

export const logout = () => {
  return dispatch => {
    axios.post('/api/logout')
      .then((response) => {
        if (response && response.status === 200) {
          dispatch(deleteUser());
        }
      });
  }
}

//// обдумать props.history.push("/home");
export const getCurrentUser = (props) => {
  return dispatch => {
    if (isEmpty(store.getState().user)) {
      axios.get('api/getcurrentuser')
        .then((response) => {
          dispatch(addUser(response.data));
        })
        .catch((error) => {
          const { pathname } = props.location;
          const isRedirectPathname = ['/login', "/home", "/registration"];
          if (!isRedirectPathname.includes(pathname)) {
            props.history.push("/home");
          }
        });
    }
  }
}

export const addUser = user => ({
  type: ADD_USER,
  user,
});

export const deleteUser = () => ({
  type: DELETE_USER,
});