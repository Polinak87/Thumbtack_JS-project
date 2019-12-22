import React from 'react';
import Button from '../../components/Button';

export default function CardButton(props) {
  const { status, applicationType, id, onClickComplete, onClickReject, onClickCancel } = props;

  if (status === 'pending') {
    if (applicationType === 'outbox') {
      return (
        <Button type="Cancel application" id={id} onClick={onClickCancel} />
      );
    }
    return (
      <div>
        <Button type="Complete application" id={id} onClick={onClickComplete} />
        <br />
        <Button type="Reject application" id={id} onClick={onClickReject} />
      </div>
    );
  }
  return;
}
