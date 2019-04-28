import React from 'react';
import axios from 'axios';

export default class ButtonCancel extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClickChoose = this.handleClickChoose.bind(this);
  }

  // handleClickChoose() {
  //   event.preventDefault();
  //   const idThingOffered = this.props.id;
  //   const idThingDesired = 1; // !!!
  //   const idUserAnswer = 1;   // !!!
  //   axios.post('/api/exchangething', { idThingOffered, idThingDesired, idUserAnswer })
  //   .then((response) => {
  //     console.log(response.data);
  //   });
  // }

  render() {
    return (
      <>
        <input className="button is-block is-danger is-large is-fullwidth" onClick={this.handleClickCancel} type="submit" value="Cancel application"></input>
      </>
    );
  }
}