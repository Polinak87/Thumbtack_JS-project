import React from 'react';
import axios from 'axios';

export default class ButtonAddRemoveFromMarket extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickAdd() {
    const id = this.props.id;
    axios.post('/api/addthingtomarket', { id })
    .then((response) => {
      this.props.updateData(id, response.data.onMarket, response.data.onMarketAt);
    });
  }

  handleClickRemove() {
    event.preventDefault();
    const id = this.props.id;
    axios.post('/api/removethingfrommarket', { id })
      .then((response) => {
        this.props.updateData(id, response.data.onMarket, response.data.onMarketAt);
      });
  }

  render() {
    const { onMarket } = this.props;
    let button;
    if (onMarket) {
      button = <button className="button is-block is-danger is-large is-fullwidth" onClick={this.handleClickRemove} >Remove from market</button>;
    } else {
      button = <button className="button is-block is-success is-large is-fullwidth" onClick={this.handleClickAdd} >Add to market</button>;
    }

    return (
      <>
        {button}
      </>
    );
  }
}