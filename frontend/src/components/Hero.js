import React from 'react';

export default class Hero extends React.Component {

  render() {
    return (
      <section className={this.props.heroType}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {this.props.heroText}
            </h1>
          </div>
        </div>
      </section>
    )
  };
};
