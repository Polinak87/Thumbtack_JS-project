export const ADD_USER ='ADD_USER';
export const DELETE_USER ='DELETE_USER';

export const addUser = user => ({ // user = response.data
  type: ADD_USER,
  user,
});

export const deleteUser = user => ({ // user = response.data
  type: DELETE_USER,
  user,
});