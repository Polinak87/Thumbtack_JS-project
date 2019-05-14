import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './card'
import Hero from '../../components/hero';
import store from '../../store/index';
import { addMarketThings } from '../../store/actions/marketThings';

class Market extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios.get('/api/marketthings')
      .then((response) => {
        let map = this.props.value;
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addMarketThings(map));
      });
  }

  render() {
    let currentUserId = store.getState().user.id;
    let cardList = [];
    for (let thing of this.props.value.values()) {
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

const mapStateToProps = state => ({
  value: state.marketThings,
});

export default connect(mapStateToProps)(Market);