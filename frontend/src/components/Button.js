import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const green = 'is-success';
export const red = 'is-danger';
export const light = 'is-light';
export const large = 'is-block is-large is-fullwidth';

export default function Button({
  children,
  onClick: clickFunction,
  id,
  userId,
  className,
  ...attrs
}) {
  const classes = () => {
    return classNames('button', className);
  };

  const tag = () => {
    if (attrs.to) {
      return Link;
    }
    return 'button';
  };

  const onClick = () => {
    if (clickFunction) {
      return clickFunction(id, userId);
    }
    return null;
  };

  const Tag = tag();

  return (
    <Tag className={classes()} {...attrs} onClick={onClick}>
      {children}
    </Tag>
  );
}
