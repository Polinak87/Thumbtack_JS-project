import React from 'react';
import classNames from 'classnames';

export const greenText = 'has-text-success';
export const greyText = 'has-text-grey';
export const italic = 'is-italic';

export default function Title2 ({ className, children }) {
  const classes = () => {
    return classNames('title', className);
  };

  return <h2 className={classes()}>{children}</h2>
}