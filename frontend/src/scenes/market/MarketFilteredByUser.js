import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './Card'
import Hero from '../../components/Hero';
import store from '../../store/index';
import { addMarketThingsOfOneUser } from '../../store/actions/marketThingsOfOneUser';
import { addThingForExchange } from '../../store/actions/thingForExchange';
import CardBlock from '../../components/CardBlock';

class MarketFilteredByUser extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/marketthingsfilteredbyuser', {
      params: {
        user: this.props.filtrationByUser,
      }
    })
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addMarketThingsOfOneUser(map));
        console.log("map");
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
            image={userThing.Thing.image}
            id={userThing.id}
            name={userThing.Thing.name}
            description={userThing.Thing.description}
            categoryName={userThing.Thing.Category.name}
            onMarketAt={userThing.onMarketAt}
            user={userThing.User}
            userId={userThing.userId}
            currentUserId={currentUserId}
            onClick={this.onClick} />
        </div>
      )
    };

    return (
      <>
        <br />
        <Hero text='Market of User' type="hero is-primary" />
        <br />
        <CardBlock cardList={cardList}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.marketThingsOfOneUser,
  filtrationByUser: state.main.filterbyUser.id,
});

export default connect(mapStateToProps)(MarketFilteredByUser);