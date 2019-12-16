import React from 'react';

export default class CardBlock extends React.Component {
  render() {
    const { cardList } = this.props;
    
    return (
      <>
        <br />
        <section className="section">
          <div className="columns is-multiline">{cardList}</div>
        </section>
      </>
    );
  }
}
