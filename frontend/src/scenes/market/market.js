import React from 'react';
import axios from 'axios';
import Card from './card'

export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
    }
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    axios.get('/api/things')
      .then((response) => {
        var map = this.state.value;
        // console.log(response.data);
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        this.setState({ value: map });
      });
  }

  updateData(id, onMarket, onMarketAt) {
    let { value } = this.state;
    let thing = value.get(id);
    thing.onMarket = onMarket;
    thing.onMarketAt = onMarketAt;
    value.set(id, thing);
    this.setState({ value });
    console.log(this.state.value);
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
            // categoryName={thing.Category.name}
            onMarket={thing.onMarket}
            onMarketAt={thing.onMarketAt}
            updateData={this.updateData}/>
        </div>
      )
    };

    return (
      <>
        <br/>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Market
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {cardList}
          </div>
        </section>
      </>
    );
  }
}