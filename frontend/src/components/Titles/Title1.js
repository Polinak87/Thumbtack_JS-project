import React from 'react';
import classNames from 'classnames';

export const greenText = 'has-text-success';
export const largeText = 'is-size-1';

export default function Title1 ({ className, children }) {
  const classes = () => {
    return classNames('title', className);
  };

  return <h1 className={classes()}>{children}</h1>
}