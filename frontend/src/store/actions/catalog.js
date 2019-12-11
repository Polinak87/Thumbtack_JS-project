export const ADD_CATALOG ='ADD_CATALOG';
export const DELETE_CATALOG ='DELETE_CATALOG';

export const addCatalog = catalog => ({
  type: ADD_CATALOG,
  catalog,
});

export const deleteCatalog = () => ({
  type: DELETE_CATALOG,
});