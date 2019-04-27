import React from 'react';
import { Link } from 'react-router-dom';

export default class ButtonExchange extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Link to="/thingsforchange" className="button is-block is-success is-large is-fullwidth" >Change</Link>
      </>
    );
  }
}