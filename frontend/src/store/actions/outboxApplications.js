export const ADD_OUTBOX_APPLICATIONS ='ADD_OUTBOX_APPLICATIONS';
export const DELETE_OUTBOX_APPLICATIONS ='DELETE_OUTBOX_APPLICATIONS';

export const addOutboxApplications = outboxApplications => ({
  type: ADD_OUTBOX_APPLICATIONS,
  outboxApplications,
});

export const deleteOutboxApplications = () => ({
  type: DELETE_OUTBOX_APPLICATIONS,
});