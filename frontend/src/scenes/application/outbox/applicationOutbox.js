import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ApplicationCard from '../applicationCard';
import FilterByStatus from '../filterByStatus';
import Infomessage from '../../../components/infoMessage';
import Hero from '../../../components/hero';
import store from '../../../store/index';
import { addOutboxApplications } from '../../../store/actions/outboxApplications';

class ApplicationOutbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showMessage: false,
    }
    this.updateData = this.updateData.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/applicationsoutbox')
      .then((response) => {
        console.log(response.data);
        let map = this.props.value;
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

  updateMessage(message, showMessage) {
    this.setState({ message });
    this.setState({ showMessage });
    console.log(this.state.message);
  };

  render() {
    const applicationType = 'outbox';
    const pageTitle = 'Your outbox applications';
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
            updateData={this.updateData} 
            updateMessage={this.updateMessage}/>
        </div>
      )
    };

    let message;
    if (this.state.showMessage) {
      message = <Infomessage updateMessage={this.updateMessage} message={ this.state.message} urlForRedirect={urlForRedirect}/>
    } else {
      message = null;
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
        {message}
      </div >
    )
  }
}

const mapStateToProps = state => ({
  value: state.outboxApplications,
});

export default connect(mapStateToProps)(ApplicationOutbox);

