import React from 'react';
import classNames from 'classnames';

export const aquamarine = 'is-primary';
export const blue = 'is-info';

export default function Hero({ className, text }) {
  const classes = () => {
    return classNames('hero', className);
  };

  return (
    <section className={classes()}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{text}</h1>
        </div>
      </div>
    </section>
  );
}
