import React from 'react';
import axios from 'axios';

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
        const message = response.data.message;
        const showMessage = true;
        this.props.updateMessage(message, showMessage);
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