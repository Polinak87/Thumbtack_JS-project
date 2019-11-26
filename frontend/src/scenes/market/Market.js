import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './Card'
import Hero from '../../components/Hero';
import store from '../../store/index';
import { addMarketThings } from '../../store/actions/marketThings';
import { addThingForExchange } from '../../store/actions/thingForExchange';

class Market extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  componentDidMount() {
    axios.get('/api/marketthings')
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addMarketThings(map));
        console.log(map);
      });
  }

  onClick(id) {
    event.preventDefault();
    const { userId } = this.props;
    const thingForExchange = {
      idThingDesired: id,
      idUserAnswer: userId,
    };
    store.dispatch(addThingForExchange(thingForExchange));
    this.props.history.replace('/thingsforexchange');
  }


  render() {
    let currentUserId = store.getState().user.id;
    let cardList = [];
    for (let userThing of this.props.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={userThing.id}>
          <Card
            id={userThing.id}
            name={userThing.Thing.name}
            description={userThing.Thing.description}
            categoryName={userThing.Thing.Category.name}
            onMarketAt={userThing.onMarketAt}
            user={userThing.User}
            userId={userThing.userId}
            currentUserId={currentUserId}
            onClick={this.onClick}/>
        </div>
      )
    };

    const heroText = 'Market';
    const heroType = "hero is-primary";

    return (
      <>
        <br/>
        <Hero text='Market' type="hero is-primary"/>
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