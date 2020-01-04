import React from 'react';
import classNames from 'classnames';
import Title1 from './Titles/Title1';

export const aquamarine = 'is-primary';
export const blue = 'is-info';
export const fullheight ='is-fullheight';

export default function Hero({ className, text, children }) {
  const classes = () => {
    return classNames('hero', className);
  };

  return (
    <section className={classes()}>
      <div className="hero-body">
        <div className="container has-text-centered">
          <Title1>{text}</Title1>
          {children}
        </div>
      </div>
    </section>
  );
}
