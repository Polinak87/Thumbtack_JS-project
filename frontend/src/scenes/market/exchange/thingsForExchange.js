import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from './card';
import Hero from '../../../components/hero';
import store from '../../../store/index';
import { deleteThingForExchange } from '../../../store/actions/thingForExchange';
import { addUserThings } from '../../../store/actions/userThings';

class ThingsForExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoMessage: false,
    }
    this.updateData = this.updateData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/userthings')
      .then((response) => {
        let map = this.props.value;
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addUserThings(map));
      });
  }

  updateData(showInfoMessage) {
    this.setState({ showInfoMessage: showInfoMessage });
  };

  handleClick() {
    event.preventDefault();
    store.dispatch(deleteThingForExchange());
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

    let infoMessage;
    if (this.state.showInfoMessage) {
      infoMessage = (
        <>
          <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-content">
              <article className="message is-info is-medium">
                <div className="message-header">
                  <p>Info</p>
                  <Link to="/market" button className="delete" onClick={this.handleClick}></Link>
                </div>
                <div className="message-body">
                  Your application is sent. You can track it in your outbox applications.
                  </div>
                <div>
                </div>
              </article>
            </div>
          </div>
        </>
      );
    } else {
      infoMessage = null;
    }

    const heroText = 'Choose thing for exchange';
    const heroType = "hero is-info";

    return (
      <>
        <br />
        <Hero heroText={heroText} heroType={heroType}/>
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
});

export default connect(mapStateToProps)(ThingsForExchange);