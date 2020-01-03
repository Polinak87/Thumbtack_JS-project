import React from 'react';

export default function ColumnsMultiline({ children }) {
  return (
    <div>
      <br />
      <section className="section">
        <div className="columns is-multiline">{children}</div>
      </section>
    </div>
  );
}
