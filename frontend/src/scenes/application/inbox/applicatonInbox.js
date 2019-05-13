import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApplicationCard from '../applicationCard';
import FilterByStatus from '../filterByStatus';
import Infomessage from '../../../components/infoMessage';
import Hero from '../../../components/hero';


export default class ApplicationInbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
      message: '',
      showMessage: false,
    }
    this.updateData = this.updateData.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/applicationsinbox')
      .then((response) => {
        console.log(response.data);
        var map = this.state.value;
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        this.setState({ value: map });
      });
  };

  updateData(id, status) {
    let { value } = this.state;
    let application = value.get(id);
    application.status = status;
    value.set(id, application);
    this.setState({ value });
    console.log(this.state.value);
  };

  updateValue(filteredValue) {
    this.setState({ value: filteredValue });
    console.log(this.state.value);
  };

  updateMessage(message, showMessage) {
    this.setState({ message });
    this.setState({ showMessage });
    console.log(this.state.message);
  };

  render() {
    const applicationType = 'inbox';
    const pageTitle = 'Your inbox applications';
    const titleLeft = 'Thing you have now';
    const titleRight = 'Thing you are offered to get';
    const urlBase = '/api/applicationsinbox';
    const urlForFilter = '/api/applicationsinboxfiltered';
    const urlForRedirect = '/applicationsinbox';

    let cardList = [];
    for (let application of this.state.value.values()) {
      const { id } = application;
      cardList.push(
        <div className="column is-one-third" key={id}>
          <ApplicationCard
            application={application}
            applicationType={applicationType}
            titleLeft={titleLeft}
            titleRight={titleRight}
            updateData={this.updateData}
            updateMessage={this.updateMessage} />
        </div>
      )
    };

    let message;
    if (this.state.showMessage) {
      message = <Infomessage updateMessage={this.updateMessage} message={ this.state.message} urlForRedirect={urlForRedirect}/>
    } else {
      message = null;
    }
    const heroText = 'Your inbox applications';
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
                urlForFilter={urlForFilter} />
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {cardList}
          </div>
        </section>
        {message}
      </div >
    )
  }
}