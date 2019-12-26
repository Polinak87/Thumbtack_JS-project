import React from 'react';
import Button, { green, red, large } from '../../components/Button';

export default function CardButton(props) {
  const { status, applicationType, id, onClickComplete, onClickReject, onClickCancel } = props;

  if (status != 'pending') {
    return null;
  }

  if (applicationType === 'outbox') {
    return (
      <Button className={`${large} ${red}`} id={id} onClick={onClickCancel}>
        Cancel application
      </Button>
    );
  }

  return (
    <div>
      <Button className={`${large} ${green}`} id={id} onClick={onClickComplete}>
        Complete application
      </Button>
      <br />
      <Button className={`${large} ${red}`} id={id} onClick={onClickReject}>
        Reject application
      </Button>
    </div>
  );
}
