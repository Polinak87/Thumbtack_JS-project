import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../../components/Hero';
import store from '../../../store/index';
import { deleteThingForExchange } from '../../../store/actions/thingForExchange';
import { addUserThings } from '../../../store/actions/userThings';
import { deleteMessage } from '../../../store/actions/message';
import Infomessage from '../../../components/InfoMessage';

class ThingsForExchange extends React.Component {
  constructor(props) {
    super(props);
    this.OnClick = this.OnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/userthings')
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addUserThings(map));
      });
  }

  OnClick() {
    event.preventDefault();
    store.dispatch(deleteThingForExchange());
    store.dispatch(deleteMessage());
  }

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
            updateData={this.updateData} />
        </div>
      )
    };

    const urlForRedirect = '/market';
    let infoMessage;
    
    if(_.isEmpty(this.props.message)) {
      infoMessage = null;
    } else {
      infoMessage = <Infomessage messageText={ this.props.message.messageText } urlForRedirect={urlForRedirect} OnClick={this.OnClick}/>
    }

    return (
      <>
        <br />
        <Hero text='Choose thing for exchange' type="hero is-info"/>
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

const mapStateToProps = state => ({
  value: state.userThings,
  message: state.message,
});

export default connect(mapStateToProps)(ThingsForExchange);