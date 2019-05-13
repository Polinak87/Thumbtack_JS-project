import React from 'react';
import axios from 'axios';
import Card from './card'
import Hero from '../../components/hero';
import store from '../../store/index';

export default class Market extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
    }
  }

  componentDidMount() {
    axios.get('/api/marketthings')
      .then((response) => {
        var map = this.state.value;
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        this.setState({ value: map });
      });
      console.log(this.state.value);
  }

  render() {
    let currentUserId = store.getState().user.id;
    let cardList = [];
    for (let thing of this.state.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={thing.id}>
          <Card
            id={thing.id}
            name={thing.name}
            description={thing.description}
            categoryName={thing.Category.name}
            onMarketAt={thing.onMarketAt}
            user={thing.User}
            userId={thing.userId}
            currentUserId={currentUserId}/>
        </div>
      )
    };

    const heroText = 'Market';
    const heroType = "hero is-primary";

    return (
      <>
        <br/>
        <Hero heroText={heroText} heroType={heroType}/>
        <section className="section">
          <div className="columns is-multiline">
            {cardList}
          </div>
        </section>
      </>
    );
  }
}