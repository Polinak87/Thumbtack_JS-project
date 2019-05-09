import React from 'react';
import axios from 'axios';
import ApplicationCard from '../applicationCard';
import FilterByStatus from '../filterByStatus';

export default class ApplicationInbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Map(),
    }
    this.updateData = this.updateData.bind(this);
    this.updateValue = this.updateValue.bind(this);
  }

  componentDidMount() {
    axios.get('/api/applicationinbox')
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

  render() {
    const applicationType = 'inbox';
    const pageTitle = 'Your inbox applications';
    const titleLeft = 'Thing you have now';
    const titleRight = 'Thing you are offered to get';
    const urlBase = '/api/applicationinbox';
    const urlForFilter = '/api/applicationinboxfiltered';

    let cardList = [];
    for (let application of this.state.value.values()) {
      const { id } = application;
      cardList.push(
        <div className="column is-one-third" key={id}>
        <ApplicationCard application={application} applicationType={applicationType} titleLeft={titleLeft} titleRight={titleRight} updateData={this.updateData}/>
        </div>
      )
    };
    return (
      <div>
        <br />
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {pageTitle}
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-centered">
            <div className="column is-narrow is-centered">
            <FilterByStatus updateValue={this.updateValue} urlBase={urlBase} urlForFilter={urlForFilter}/>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="columns is-multiline">
            {cardList}
          </div>
        </section>
      </div >
    )
  }
}