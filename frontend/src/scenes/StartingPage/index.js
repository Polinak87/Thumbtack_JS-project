import React from 'react';
import Button, { green, large } from '../../components/Button';
import Column from '../../components/Column';

export default class StartingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="columns is-centered">
        <Column>
          <section className="hero is-success is-fullheight">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title has-text-success is-size-1">A thing's new life</h1>
                <br />
                <em className="title has-text-grey">Exchange things you don't use any more for things you like</em>
                <div className="box">
                  <Button to="/registration" className={large + " " + green} value="Registration"/>
                  <br />
                  <Button to="/login" className={large + " " + green} value="Login" />
                </div>
              </div>
            </div>
          </section>
        </Column>
      </div>
    );
  }
}