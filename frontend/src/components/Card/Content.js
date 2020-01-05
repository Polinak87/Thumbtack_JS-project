import React from 'react';
import classNames from 'classnames';

export const full = '-is-full';

export default function Content({children, className}) {
  const classes = () => {
    return classNames('card-content', className);
  };

  return <div className={classes()}>{children}</div>
} 