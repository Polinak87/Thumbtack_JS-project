import React from 'react';
import axios from 'axios';
import store from '../../../store/index';
import { addMessage } from '../../../store/actions/message';

export default class ButtonReject extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    event.preventDefault();
    const id = this.props.id;
    axios.put('/api/rejectapplication', { id })
    .then((response) => {
      console.log(response.data);
      this.props.updateData(id, response.data.status);
      if (response.data.message!== '') {
        store.dispatch(addMessage({messageText: response.data.message}));
      }
    });
  }

  render() {
    return (
      <>
        <button className="button is-block is-danger is-large is-fullwidth" onClick={this.handleClick} >Reject application</button>
      </>
    );
  }
}