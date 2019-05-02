import React from 'react';
import axios from 'axios';
import store from '../store/index';
import { deleteUser } from '../store/actions/user';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick() {
    event.preventDefault();
    axios.post('/api/logout')
      .then((response) => {
        console.log(response);
        if (response && response.status === 200) {
          store.dispatch(deleteUser());
          console.log(store.getState().user);
          // this.props.history.push("/home");
        }
      });
    }

    // handleClick() {
    //   event.preventDefault();
    //   const { email, password } = this.state;
    //   console.log(email, password);
    //   axios.post('/api/login', { email, password })
    //     .then((response) => {
    //       console.log(response);
    //       if (response && response.status === 200) {
    //         store.dispatch(addUser(response.data));
    //         this.props.history.push("/profile");
    //       }
    //     });
    // }

  render() {
    console.log(this.props.history);

    return (
      <button className="button is-light" onClick={this.handleClick}>Log out</button>
    );
  }
}
