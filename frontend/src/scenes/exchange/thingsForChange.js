import React from 'react';
import axios from 'axios';
import Card from './card';

export default class ThingsForChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
      showInfoMessage: false,
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.id);
    axios.get('/api/userthings')
      .then((response) => {
        var map = this.state.value;
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        this.setState({ value: map });
      });
  }

  updateData(showInfoMessage) {
    this.setState({ showInfoMessage: showInfoMessage });
    console.log(this.state.showInfoMessage);
  };

  render() {
    let cardList = [];
    for (let thing of this.state.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={thing.id}>
          <Card
            id={thing.id}
            name={thing.name}
            description={thing.description}
            categoryName={thing.Category.name}
            onMarket={thing.onMarket}
            onMarketAt={thing.onMarketAt}
            updateData={this.updateData} />
        </div>
      )
    };

    let infoMessage;
    if(this.state.showInfoMessage){
      infoMessage = (
        <>
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-content">
          <article className="message is-info is-medium">
            <div className="message-header">
              <p>Info</p>
            </div>
            <div className="message-body">
              Your application is sent. You can track it in your outbox applications.
            </div>
          </article>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>
        </>
      );
    } else {
      infoMessage = null;
    }

    return (
      <>
        <br />
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Choose thing you offer for exchange</h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {cardList}
          </div>
        </section>
          {infoMessage}
      </>
    );
  }
}
