export const ADD_USER ='ADD_USER';

export const addUser = user => ({ // user = response.data
  type: ADD_USER,
  user,
});