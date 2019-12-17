import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../components/Hero';
import store from '../../store/index';
import { addUserThings } from '../../store/actions/userThings';
import CardBlock from '../../components/CardBlock';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.onClick = this.onClick.bind(this);
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
  }

  onClick(id, type) {
    event.preventDefault();
    if (type=='Add to market') {
      axios.post('/api/addthingtomarket', { id })
      .then((response) => {
        this.updateData(id, response.data.onMarket, response.data.onMarketAt);
      });
      console.log('click add');
      console.log(id);
    };
    if (type=='Remove from market'){
      axios.post('/api/removethingfrommarket', { id })
      .then((response) => {
        this.updateData(id, response.data.onMarket, response.data.onMarketAt);
      });
      console.log('click remove');
    };
  }

  render() {
    let cardList = [];
    for (let UserThing of this.props.value.values()) {
      cardList.push(
        <div className="column is-one-quarter" key={UserThing.id}>
          <Card
            image={UserThing.Thing.image}
            id={UserThing.id}
            name={UserThing.Thing.name}
            description={UserThing.Thing.description}
            categoryName={UserThing.Thing.Category.name}
            onMarket={UserThing.onMarket}
            onMarketAt={UserThing.onMarketAt}
            updateData={this.updateData}
            onClick={this.onClick}/>
        </div>
      )
    };

    return (
      <>
        <br/>
        <Hero text='Your inventory' type="hero is-primary"/>
        <CardBlock cardList={cardList}/>
      </>
    );
  }
}

const mapStateToProps = state => ({
  value: state.things.userThings,
});

export default connect(mapStateToProps)(Profile);
