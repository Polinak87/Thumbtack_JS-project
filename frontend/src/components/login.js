import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.post('/api/login', {
      email: 'test@example.com',
      password: 'password',
    })
      .then((response) => {
        console.log(response);
        // this.setState({ value: response.data })
      });
  }

  handleClick() {
    axios.post('/api/logout')
      .then((response) => console.log(response));
  }

  render() {
    return (
      <div>
        <ul>login</ul>
        <h3>{this.state.value}</h3>
        <button onClick={this.handleClick}>Log out</button>
      </div>
    );
  }
}
