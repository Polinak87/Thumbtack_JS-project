import axios from 'axios';

export const ADD_CATEGORIES = 'ADD_CATEGORIES';
export const DELETE_CATEGORIES = 'DELETE_CATEGORIES';

export const getCategories = () => {
  return dispatch => {
    axios.get('/api/category')
      .then((response) => {
        dispatch(addCategoryList(response.data));
        console.log('response.data');
        console.log(response);
      });
  };
}

export const addCategoryList = categoryList => ({
  type: ADD_CATEGORIES,
  categoryList,
});

export const deleteCategories = () => ({
  type: DELETE_CATEGORIES,
});
