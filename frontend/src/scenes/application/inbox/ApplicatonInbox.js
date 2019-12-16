import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import ApplicationCard from '../ApplicationCard';
import FilterByStatus from '../FilterByStatus';
import Infomessage from '../../../components/InfoMessage';
import Hero from '../../../components/Hero';
import store from '../../../store/index';
import CardBlock from '../../../components/CardBlock';
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
    axios.get('/api/applicationsinbox').then(response => {
      let map = new Map();
      response.data.forEach(function(thing) {
        map.set(thing.id, thing);
      });
      this.props.addInboxApplications(map);
    });
  }

  updateData(id, status) {
    let { value } = this.props;
    let application = value.get(id);
    application.status = status;
    value.set(id, application);
    this.props.addInboxApplications(value);
  }

  updateValue(filteredValue) {
    this.props.addInboxApplications(filteredValue);
  }

  onClose() {
    event.preventDefault();
    store.dispatch(deleteMessage());
  }

  onClick(id, type) {
    event.preventDefault();
    if (type == 'Complete application') {
      axios.put('/api/completeapplication', { id }).then(response => {
        if (response.status === 200) {
          let arrayForUpdate = response.data;
          for (let i = 0; i < arrayForUpdate.length; i++) {
            const { id, status, message } = arrayForUpdate[i];
            this.updateData(id, status);
            if (message !== '') {
              store.dispatch(addMessage({ messageText: message }));
            }
          }
        }
      });
    }
    if (type == 'Reject application') {
      axios.put('/api/rejectapplication', { id }).then(response => {
        this.updateData(id, response.data.status);
        if (response.data.message !== '') {
          store.dispatch(addMessage({ messageText: response.data.message }));
        }
      });
    }
  }

  render() {
    let cardList = [];
    for (let application of this.props.value.values()) {
      const { id } = application;
      cardList.push(
        <div className="column is-one-third" key={id}>
          <ApplicationCard
            application={application}
            applicationType="inbox"
            titleLeft="Thing you have now"
            titleRight="Thing you are offered to get"
            updateData={this.updateData}
            onClick={this.onClick}
          />
        </div>,
      );
    }

    return (
      <div>
        <br />
        <Hero text="Your inbox applications" type="hero is-primary" />
        <FilterByStatus
          updateValue={this.updateValue}
          urlBase="/api/applicationsinbox"
          urlForFilter="/api/applicationsinboxfiltered"
        />
        <CardBlock cardList={cardList} />
        {!isEmpty(this.props.message) && (
          <Infomessage
            text={this.props.message.messageText}
            urlForRedirect="/applicationsinbox"
            onClose={this.onMessageClose}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.inboxApplications,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  addInboxApplications: value => dispatch(addInboxApplications(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationInbox);
