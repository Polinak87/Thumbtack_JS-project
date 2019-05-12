import React from 'react';
import axios from 'axios';

export default class ButtonComplete extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    event.preventDefault();
    const id = this.props.id;
    axios.put('/api/completeapplication', { id })
    // .then((response) => {
    //   console.log(response.data);
    //   this.props.updateData(id, response.data.status);
    // });
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        let arrayForUpdate = response.data;
        for (let i = 0; i < arrayForUpdate.length; i++) {
          const { id, status, message } = arrayForUpdate[i];
          this.props.updateData(id, status);
          if (message!== '') {
            const showMessage = true;
            this.props.updateMessage(message, showMessage);
          }
        }
      }
    });
  }

  render() {
    return (
      <>
        <button className="button is-block is-success is-large is-fullwidth" onClick={this.handleClick} >Complete application</button>
      </>
    );
  }
}