import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ApplicationCard from '../ApplicationCard';
import FilterByStatus from '../FilterByStatus';
import Infomessage from '../../../components/InfoMessage';
import Hero from '../../../components/Hero';
import store from '../../../store/index';
import { addInboxApplications } from '../../../store/actions/inboxApplications';
import { deleteMessage } from '../../../store/actions/message';

class ApplicationInbox extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    axios.get('/api/applicationsinbox')
      .then((response) => {
        let map = new Map();
        response.data.forEach(function (thing) {
          map.set(thing.id, thing)
        });
        store.dispatch(addInboxApplications(map));
      });
  };

  updateData(id, status) {
    let { value } = this.props;
    let application = value.get(id);
    application.status = status;
    value.set(id, application);
    store.dispatch(addInboxApplications(value));
  };

  updateValue(filteredValue) {
    store.dispatch(addInboxApplications(filteredValue));
  };

  onClose() {
    event.preventDefault();
    store.dispatch(deleteMessage());
  };

  onClick(id, type) {
    event.preventDefault();
    if (type=='Complete application'){
      axios.put('/api/completeapplication', { id })
      .then((response) => {
        if (response.status === 200) {
          let arrayForUpdate = response.data;
          for (let i = 0; i < arrayForUpdate.length; i++) {
            const { id, status, message } = arrayForUpdate[i];
            this.updateData(id, status);
            if (message!== '') {
              store.dispatch(addMessage({messageText: message}));
            }
          }
        }
      });
    }
    if (type=='Reject application'){
      axios.put('/api/rejectapplication', { id })
      .then((response) => {
        this.updateData(id, response.data.status);
        if (response.data.message!== '') {
          store.dispatch(addMessage({messageText: response.data.message}));
        }
      });
    }
  };

  render() {
    const applicationType = 'inbox';
    const titleLeft = 'Thing you have now';
    const titleRight = 'Thing you are offered to get';
    const urlBase = '/api/applicationsinbox';
    const urlForFilter = '/api/applicationsinboxfiltered';
    const urlForRedirect = '/applicationsinbox';

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
            onClick={this.onClick}/>
        </div>
      )
    };

    let infoMessage;
    if(_.isEmpty(this.props.message)) {
      infoMessage = null;
    } else {
      infoMessage = <Infomessage 
                      text={ this.props.message.messageText }
                      urlForRedirect={urlForRedirect}
                      onClose={this.onClose}/>
    }

    return (
      <div>
        <br />
        <Hero text='Your inbox applications' type="hero is-primary"/>
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
        {infoMessage}
      </div >
    )
  }
}

const mapStateToProps = state => ({
  value: state.inboxApplications,
  message: state.message,
});

export default connect(mapStateToProps)(ApplicationInbox);