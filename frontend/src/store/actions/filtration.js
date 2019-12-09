export const ADD_FILTRATIONTYPE ='ADD_FILTRATIONTYPE';
export const DELETE_FILTRATIONTYPE ='DELETE_FILTRATIONTYPE';

export const addFiltrationType = filtrationType => ({
  type: ADD_FILTRATIONTYPE,
  filtrationType,
});

export const deleteFiltrationType = () => ({
  type: DELETE_FILTRATIONTYPE,
});