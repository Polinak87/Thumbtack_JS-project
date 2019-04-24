import React from 'react';
import axios from 'axios';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickAdd() {
    event.preventDefault();
    const id = this.props.id;
    // console.log(id);
    axios.post('/api/addthingtomarket', { id })
    .then((response) => {
      this.props.updateData(id, response.data.onMarket, response.data.onMarketAt);
    });
  }

  handleClickRemove() {
    event.preventDefault();
    const id = this.props.id;
    // console.log(id);
    axios.post('/api/removethingfrommarket', { id })
      .then((response) => {
        this.props.updateData(id, response.data.onMarket, response.data.onMarketAt);
      });
  }

  render() {
    const { id, name, description, category, onMarket, onMarketAt } = this.props;
    let button;
    if (onMarket) {
      button = <input className="button is-block is-danger is-large is-fullwidth" onClick={this.handleClickRemove} type="submit" value="Remove from market"></input>;
    } else {
      button = <input className="button is-block is-success is-large is-fullwidth" onClick={this.handleClickAdd} type="submit" value="Add to market"></input>;
    }

    return (
      <div>
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-content">
            <div className="content">
              id: {id}
              <br />
              Name: {name}
              <br />
              Category: {category}
              <br />
              Description: {description}
              <br />
              <time dateTime="2016-1-1">On market from: {onMarketAt}</time>
            </div>
          </div>
        </div>
        <div>
          {button}
          <br />
        </div>
      </div>
    );
  }
}