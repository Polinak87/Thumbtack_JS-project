export const ADD_SORTINGTYPE ='ADD_SORTINGTYPE';
export const DELETE_SORTINGTYPE ='DELETE_SORTINGTYPE';

export const addSortingType = sortingType => ({
  type: ADD_SORTINGTYPE,
  sortingType,
});

export const deleteSortingType = () => ({
  type: DELETE_SORTINGTYPE,
});