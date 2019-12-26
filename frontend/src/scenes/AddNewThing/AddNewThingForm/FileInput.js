import React from 'react';

export default function FileInput(props) {
  const { onChange, fileName } = props;
  return (
    <div className="field">
      <div className="file is-large is-success has-name is-fullwidth">
        <label className="file-label">
          <input className="file-input" type="file" name="file" onChange={onChange} />
          <span className="file-cta">
            {/* <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span> */}
            <span className="file-label ">Choose a file</span>
          </span>
          <span className="file-name">{fileName}</span>
        </label>
      </div>
    </div>
  );
}
