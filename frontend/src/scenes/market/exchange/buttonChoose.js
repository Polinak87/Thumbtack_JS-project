import React from 'react';
import axios from 'axios';
import store from '../../../store/index';
import { addMessage } from '../../../store/actions/message';

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
        const messageText = ' Your application is sent. You can track it in your outbox applications.';
        store.dispatch(addMessage({messageText}));
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