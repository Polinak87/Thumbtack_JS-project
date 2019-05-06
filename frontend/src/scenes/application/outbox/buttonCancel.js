import React from 'react';
import axios from 'axios';

export default class ButtonCancel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    event.preventDefault();
    const id = this.props.id;
    axios.post('/api/cancelapplication', { id })
    .then((response) => {
      console.log(response.data);
      this.props.updateData(id, response.data.status);
    });
  }

  render() {
    return (
      <>
        <input className="button is-block is-danger is-large is-fullwidth" onClick={this.handleClick} type="submit" value="Cancel application"></input>
      </>
    );
  }
}