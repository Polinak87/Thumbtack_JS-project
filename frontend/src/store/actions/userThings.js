export const ADD_USER_THINGS ='ADD_USER_THINGS';
export const DELETE_USER_THINGS ='DELETE_USER_THINGS';

export const addUserThings = UserThings => ({
  type: ADD_USER_THINGS,
  UserThings,
});

export const deleteUserThings = () => ({
  type: DELETE_USER_THINGS,
});