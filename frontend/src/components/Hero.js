import React from 'react';

export default class Hero extends React.Component {
  render() {
    return (
      <section className={this.props.type}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{this.props.text}</h1>
          </div>
        </div>
      </section>
    );
  }
}
