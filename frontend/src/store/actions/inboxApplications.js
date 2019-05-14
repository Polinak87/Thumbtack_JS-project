export const ADD_INBOX_APPLICATIONS ='ADD_INBOX_APPLICATIONS';
export const DELETE_INBOX_APPLICATIONS ='DELETE_OUTBOX_APPLICATIONS';

export const addInboxApplications = inboxApplications => ({
  type: ADD_INBOX_APPLICATIONS,
  inboxApplications,
});

export const deleteInboxApplications = () => ({
  type: DELETE_INBOX_APPLICATIONS,
});