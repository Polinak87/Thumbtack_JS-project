import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../components/Hero';
import store from '../../store/index';
import { addUserThings } from '../../store/actions/userThings';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    axios.get('/api/userthings')
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing);
        })
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

    return (
      <>
        <br/>
        <Hero text='Your inventory' type="hero is-primary"/>
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