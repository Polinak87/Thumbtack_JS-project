import React from 'react';

export default function CardBlock({ cardList }) {
  return (
    <div>
      <br />
      <section className="section">
        <div className="columns is-multiline">{cardList}</div>
      </section>
    </div>
  );
}
