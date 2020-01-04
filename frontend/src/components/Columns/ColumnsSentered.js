import React from 'react';

export default function ColumnsSentered({ children }) {
  return (
    <div>
      <br />
      <section className="section">
        <div className="columns is-centered">{children}</div>
      </section>
    </div>
  );
}