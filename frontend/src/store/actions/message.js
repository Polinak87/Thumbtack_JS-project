export const ADD_MESSAGE ='ADD_MESSAGE';
export const DELETE_MESSAGE ='DELETE_MESSAGE';

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message,
});

export const deleteMessage = () => ({
  type: DELETE_MESSAGE,
});