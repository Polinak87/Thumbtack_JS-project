import axios from 'axios';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const ADD_SORTINGTYPE = 'ADD_SORTINGTYPE';
export const DELETE_SORTINGTYPE = 'DELETE_SORTINGTYPE';
export const ADD_FILTRATIONTYPE = 'ADD_FILTRATIONTYPE';
export const DELETE_FILTRATIONTYPE = 'DELETE_FILTRATIONTYPE';
export const ADD_FILTRATION_BY_USER = 'ADD_FILTRATIONTYPE_BY_USER';
export const DELETE_FILTRATION_BY_USER = 'DELETE_FILTRATION_BY_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

export const getCategories = () => {
  return dispatch => {
    axios.get('/api/category').then(response => {
      dispatch(addCategoryList(response.data));
    });
  };
};

export const addCategoryList = categoryList => ({
  type: ADD_CATEGORIES,
  categoryList,
});

export const addSortingType = type => ({
  type: ADD_SORTINGTYPE,
  type,
});

export const deleteSortingType = () => ({
  type: DELETE_SORTINGTYPE,
});

export const addFiltrationType = category => ({
  type: ADD_FILTRATIONTYPE,
  category,
});

export const deleteFiltrationType = () => ({
  type: DELETE_FILTRATIONTYPE,
});

export const addFiltrationByUser = id => ({
  type: ADD_FILTRATION_BY_USER,
  id,
});

export const deleteFiltrationByUser = () => ({
  type: DELETE_FILTRATION_BY_USER,
});

export const addMessage = message => ({
  type: ADD_MESSAGE,
  message,
});

export const deleteMessage = () => ({
  type: DELETE_MESSAGE,
});
