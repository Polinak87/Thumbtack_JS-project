import React from 'react';

export default function ButtonSubmit(props) {

  const { value } = props;

  return (
    <div className="field">
      <div className="control">
        <input className="button is-block is-success is-large is-fullwidth" type="submit" value={value} />
      </div>
    </div>
  );
}