import React from 'react';

export default function FormField(props) {

  const {type, name, placeholder, onChange, value} = props;

  return (
    <div className="field">
      <div className="control">
        <input className="input" type={type} name={name} required placeholder={placeholder} onChange={onChange} value={value} />
      </div>
    </div>
  );
}

