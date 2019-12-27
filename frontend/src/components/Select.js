import React from 'react';
import classNames from 'classnames';

export const fullwidth = 'is-fullwidth';
export const aquamarine = 'is-primary';
export const green = 'is-success'; 

export default function Select({ className, onChange, value, categoryOptons }) {

  const classes = () => {
    return classNames('select', className);
  };

    return (
      <div className="field">
        <div className="control">
          <div className={classes()}>
            <select name="categoryId" onChange={onChange} value={value}>
              {categoryOptons}
            </select>
          </div>
        </div>
      </div>
    );
}
