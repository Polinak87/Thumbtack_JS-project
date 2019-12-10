export const ADD_FILTRATIONTYPE ='ADD_FILTRATIONTYPE';
export const DELETE_FILTRATIONTYPE ='DELETE_FILTRATIONTYPE';
export const ADD_FILTRATION_BY_USER ='ADD_FILTRATIONTYPE_BY_USER';
export const DELETE_FILTRATION_BY_USER ='DELETE_FILTRATION_BY_USER';

export const addFiltrationType = filtrationType => ({
  type: ADD_FILTRATIONTYPE,
  filtrationType,
});

export const deleteFiltrationType = () => ({
  type: DELETE_FILTRATIONTYPE,
});

export const addFiltrationByUser = filtrationByUser => ({
  type: ADD_FILTRATION_BY_USER,
  filtrationByUser,
});

export const deleteFiltrationByUser = () => ({
  type: DELETE_FILTRATION_BY_USER,
});