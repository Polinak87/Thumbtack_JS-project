import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ApplicationCard from '../applicationCard';
import FilterByStatus from '../filterByStatus';
import Infomessage from '../../../components/infoMessage';
import Hero from '../../../components/Hero';
import store from '../../../store/index';
import { addOutboxApplications } from '../../../store/actions/outboxApplications';
import { deleteMessage } from '../../../store/actions/message';

const _ = require('lodash');

class ApplicationOutbox extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.OnClick = this.OnClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/applicationsoutbox')
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addOutboxApplications(map));
      });
  };

  updateData(id, status) {
    let { value } = this.props;
    let application = value.get(id);
    application.status = status;
    value.set(id, application);
    store.dispatch(addOutboxApplications(value));
  };

  updateValue(filteredValue) {
    store.dispatch(addOutboxApplications(filteredValue));
  };

  OnClick() {
    event.preventDefault();
    store.dispatch(deleteMessage());
  }

  render() {
    const applicationType = 'outbox';
    const titleLeft = 'Thing you want to have';
    const titleRight = 'Thing you want to change';
    const urlBase = '/api/applicationsoutbox';
    const urlForFilter = '/api/applicationsoutboxfiltered';
    const urlForRedirect = '/applicationsoutbox';

    let cardList = [];
    for (let application of this.props.value.values()) {
      const { id } = application;
      cardList.push(
        <div className="column is-one-third" key={id}>
          <ApplicationCard
            application={application}
            applicationType={applicationType}
            titleLeft={titleLeft}
            titleRight={titleRight}
            updateData={this.updateData}/>
        </div>
      )
    };

    let infoMessage;
    if(_.isEmpty(this.props.message)) {
      infoMessage = null;
    } else {
      infoMessage = <Infomessage 
                      messageText={ this.props.message.messageText }
                      urlForRedirect={urlForRedirect}
                      OnClick={this.OnClick}/>
    }

    const heroText = 'Your outbox applications';
    const heroType = "hero is-primary";

    return (
      <div>
        <br />
        <Hero heroText={heroText} heroType={heroType}/>
        <section className="section">
          <div className="columns is-centered">
            <div className="column is-narrow is-centered">
            <FilterByStatus 
              updateValue={this.updateValue}
              urlBase={urlBase}
              urlForFilter={urlForFilter}/>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {cardList}
          </div>
        </section>
        {infoMessage}
      </div >
    )
  }
}

const mapStateToProps = state => ({
  value: state.outboxApplications,
  message: state.message,
});

export default connect(mapStateToProps)(ApplicationOutbox);

