import React from 'react';
import Button from '../../components/Button';

export default function CardButton(props) {
  const { status, applicationType, id, updateData, onClick } = props;
  switch (status) {
    case 'pending':
      if (applicationType === 'outbox') {
        return (
          <Button type="Cancel application" id={id} updateData={updateData} onClick={onClick} />
        );
      } else {
        return (
          <div>
            <Button type="Complete application" id={id} updateData={updateData} onClick={onClick} />
            <br />
            <Button type="Reject application" id={id} updateData={updateData} onClick={onClick} />
          </div>
        );
      }
    default:
      return <></>;
  }
}
