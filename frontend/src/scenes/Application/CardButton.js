import React from 'react';
import Button, { green, red } from '../../components/Button';

export default function CardButton(props) {
  const { status, applicationType, id, onClickComplete, onClickReject, onClickCancel } = props;

  if (status === 'pending') {
    if (applicationType === 'outbox') {
      return (
        <Button className={red} value="Cancel application" id={id} onClick={onClickCancel} />
      );
    }
    return (
      <div>
        <Button className={green} value="Complete application" id={id} onClick={onClickComplete} />
        <br />
        <Button className={red} value="Reject application" id={id} onClick={onClickReject} />
      </div>
    );
  }
  return null;
}
