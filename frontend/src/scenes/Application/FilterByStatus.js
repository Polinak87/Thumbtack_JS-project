import React from 'react';
import Select, { aquamarine } from '../../components/Select';

export default function FilterByStatus(props) {
  const { onChange } = props;

  const status = {
    all: 'all',
    completed: 'completed',
    rejected: 'rejected',
    pending: 'pending',
    canceled: 'canceled',
  }

  const categoryOptons = [];

  for (let variant in status) {
    categoryOptons.push(
      <option key={status[variant]} value={status[variant]}>
        {status[variant]}
      </option>
    )
  }

  return (
    <Select className={aquamarine} onChange={onChange} categoryOptons={categoryOptons} />
  );
}
