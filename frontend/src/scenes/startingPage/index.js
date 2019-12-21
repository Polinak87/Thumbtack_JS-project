import React from 'react';
import { Link } from 'react-router-dom';

export default class StartingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="columns is-centered">
        <div className="column is-one-third">
          <section className="hero is-success is-fullheight">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title has-text-success is-size-1">A thing's new life</h1>
                <br />
                <em className="title has-text-grey">Exchange things you don't use any more for things you like</em>
                <div className="box">
                  <Link to="/registration" className="button is-block is-success is-large is-half" >Registration</Link>
                  <br />
                  <Link to="/login" className="button is-block is-success is-large is-half" >Log in</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
