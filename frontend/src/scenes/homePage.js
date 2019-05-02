import React from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

 render() {

  return(
    <div>
      <Link to="/registration" className="button is-block is-success is-large is-fullwidth" >Registration</Link>
      <br/>
      <Link to="/login" className="button is-block is-success is-large is-fullwidth" >Log in</Link>
    </div>
  );
  }
}
