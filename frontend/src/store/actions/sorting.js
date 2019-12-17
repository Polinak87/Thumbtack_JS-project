export const ADD_SORTINGTYPE ='ADD_SORTINGTYPE';
export const DELETE_SORTINGTYPE ='DELETE_SORTINGTYPE';

export const addSortingType = type => ({
  type: ADD_SORTINGTYPE,
  type,
});

export const deleteSortingType = () => ({
  type: DELETE_SORTINGTYPE,
});