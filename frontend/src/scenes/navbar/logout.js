import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import store from '../../store/index';
import { deleteUser } from '../../store/actions/user';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    event.preventDefault();
    axios.post('/api/logout')
      .then((response) => {
        if (response && response.status === 200) {
          store.dispatch(deleteUser());
        }
      });
    }

  render() {

    return (
      <Link to='/home' button className="button is-light" onClick={this.handleClick}>Log out</Link>
    );
  }
}
