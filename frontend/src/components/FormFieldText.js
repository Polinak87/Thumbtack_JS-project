import React from 'react';

export default function FormFieldText({ type, name, placeholder, onChange, value }) {
  return (
    <div className="field">
      <div className="control">
        <input
          className="input"
          type={type}
          name={name}
          required
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
