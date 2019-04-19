import React from 'react';
import axios from 'axios';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    axios.post('/api/logout')
      .then((response) => console.log(response));
  }

  render() {
    return (
      <div>
        {/* <h3>{this.state.value}</h3> */}
        <button className="button" onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}
