import React from 'react';
import axios from 'axios';

export default class ButtonChoose extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickChoose = this.handleClickChoose.bind(this);
  }

  handleClickChoose() {
    event.preventDefault();
    const idThingOffered = this.props.id;
    const idThingDesired = 1; // !!!
    const idUserAnswer = 1;   // !!!
    axios.post('/api/createapplication', { idThingOffered, idThingDesired, idUserAnswer })
    .then((response) => {
      console.log(response.data);
      if (response.data === 'Application is created.') {
        this.props.updateData(true);
      }
    });
  }

  render() {
    return (
      <>
        <input className="button is-block is-success is-large is-fullwidth" onClick={this.handleClickChoose} type="submit" value="Choose"></input>
      </>
    );
  }
}