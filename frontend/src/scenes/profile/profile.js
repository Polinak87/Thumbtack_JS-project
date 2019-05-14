import React from 'react';
import axios from 'axios';
import Card from './card';
import Hero from '../../components/hero';
import store from '../../store/index';
import { addUserThings } from '../../store/actions/userThings';
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    axios.get('/api/userthings')
      .then((response) => {
        let map = this.props.value;
        response.data.forEach(function (thing) {
          map.set(thing.id, thing);
        });
        store.dispatch(addUserThings(map));
      })
  }

  updateData(id, onMarket, onMarketAt) {
    let { value } = this.props;
    let thing = value.get(id);
    thing.onMarket = onMarket;
    thing.onMarketAt = onMarketAt;
    value.set(id, thing);
    store.dispatch(addUserThings(value));
  };

  render() {
    let cardList = [];
    for (let thing of this.props.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={thing.id}>
          <Card
            id={thing.id}
            name={thing.name}
            description={thing.description}
            categoryName={thing.Category.name}
            onMarket={thing.onMarket}
            onMarketAt={thing.onMarketAt}
            updateData={this.updateData}/>
        </div>
      )
    };

    const heroText = 'Your inventory';
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
  value: state.userThings,
});

export default connect(mapStateToProps)(Profile);
