import React from 'react';
import axios from 'axios';
import store from '../../../store/index';

export default class ButtonChoose extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickChoose = this.handleClickChoose.bind(this);
  }

  handleClickChoose() {
    event.preventDefault();
    const idThingOffered = this.props.id;
    const { idThingDesired, idUserAnswer } = store.getState().thingForExchange;
    axios.post('/api/createapplication', { idThingOffered, idThingDesired, idUserAnswer })
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
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