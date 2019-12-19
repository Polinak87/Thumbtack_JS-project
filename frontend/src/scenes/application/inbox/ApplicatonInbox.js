import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ApplicationCard from '../ApplicationCard';
import FilterByStatus from '../FilterByStatus';
import Hero from '../../../components/Hero';
import store from '../../../store/index';
import CardBlock from '../../../components/CardBlock';
import { getInboxApplications } from '../../../store/actions/inboxApplications';
import { addInboxApplications } from '../../../store/actions/inboxApplications';
import { rejectApplication } from '../../../store/actions/inboxApplications';
import { completeApplication } from '../../../store/actions/inboxApplications';

class ApplicationInbox extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.getInboxApplications('all');
  }

  updateData(id, status) {
    let { value } = this.props;
    let application = value.get(id);
    application.status = status;
    value.set(id, application);
    this.props.addInboxApplications(value);
  }

  onClick(id, type) {
    event.preventDefault();
    if (type == 'Complete application') {
      const { completeApplication } =this.props;
      completeApplication(id);
      // axios.put('/api/completeapplication', { id }).then(response => {
      //   if (response.status === 200) {
      //     let arrayForUpdate = response.data;
      //     for (let i = 0; i < arrayForUpdate.length; i++) {
      //       const { id, status, message } = arrayForUpdate[i];
      //       this.updateData(id, status);
      //       if (message !== '') {
      //         store.dispatch(addMessage({ messageText: message }));
      //       }
      //     }
      //   }
      // });
    }
    if (type == 'Reject application') {
      const { rejectApplication } = this.props;
      rejectApplication(id);
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
        <FilterByStatus />
        <CardBlock cardList={cardList} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  value: state.applications.inbox,
});

const mapDispatchToProps = dispatch => ({
  getInboxApplications: value => dispatch(getInboxApplications(value)),
  addInboxApplications: value => dispatch(addInboxApplications(value)),
  rejectApplication: id => dispatch(rejectApplication(id)),
  completeApplication: id => dispatch(completeApplication(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationInbox);
