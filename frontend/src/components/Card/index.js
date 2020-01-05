import React from 'react';
import Column from '../Columns/Column';

export default function Card(props) {
  const {
    header,
    button,
    children,
  } = props;

  return (
    <Column>
      <div className="card">
        {header}
        {children}
        {button}
      </div>
    </Column>
  );
}
