import React from 'react';
import { Link } from 'react-router-dom';
import store from '../../store/index';
import { addThingForExchange } from '../../store/actions/thingForExchange';

export default class ButtonExchange extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    event.preventDefault();
    const { id, userId } = this.props;
    const thingForExchange = {
      idThingDesired: id,
      idUserAnswer: userId,
    };
    store.dispatch(addThingForExchange(thingForExchange));
  }

  render() {
    return (
      <>
        <Link to="/thingsforexchange" className="button is-block is-success is-large is-fullwidth" onClick={this.handleClick} >Exchange</Link>
      </>
    );
  }
}