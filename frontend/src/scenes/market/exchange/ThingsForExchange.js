import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './Card';
import Hero from '../../../components/Hero';
import store from '../../../store/index';
import { deleteThingForExchange } from '../../../store/actions/thingForExchange';
import { addUserThings } from '../../../store/actions/userThings';
import { addMessage } from '../../../store/actions/message';
import { deleteMessage } from '../../../store/actions/message';
import Infomessage from '../../../components/InfoMessage';

class ThingsForExchange extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onClick=this.onClick.bind(this);
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

  onClose() {
    event.preventDefault();
    store.dispatch(deleteThingForExchange());
    store.dispatch(deleteMessage());
  }

  onClick(id) {
    event.preventDefault();
    const idThingOffered = id;
    const { idThingDesired, idUserAnswer } = store.getState().thingForExchange;
    axios.post('/api/createapplication', { idThingOffered, idThingDesired, idUserAnswer })
    .then((response) => {
      if (response.status === 200) {
        const messageText = ' Your application is sent. You can track it in your outbox applications.';
        store.dispatch(addMessage({messageText}));
      }
    });
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
            onClick={this.onClick} />
        </div>
      )
    };

    const urlForRedirect = '/market';
    let infoMessage;
    
    if(_.isEmpty(this.props.message)) {
      infoMessage = null;
    } else {
      infoMessage = <Infomessage text={ this.props.message.messageText } urlForRedirect={urlForRedirect} onClose={this.onClose}/>
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