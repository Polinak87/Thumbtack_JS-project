import React from 'react';
import { connect } from 'react-redux';
import Application from '../Aplication';
import { getInboxApplications } from '../../../store/actions/applications';
import { rejectApplication } from '../../../store/actions/applications';
import { completeApplication } from '../../../store/actions/applications';

class ApplicationInbox extends React.Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onClickReject = this.onClickReject.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
  }

  componentDidMount() {
    this.props.getInboxApplications('all');
  }

  onFilterChange() {
    this.props.getInboxApplications(event.target.value);
  }

  onClickComplete(id) {
    const { completeApplication } = this.props;
    completeApplication(id);
  }

  onClickReject(id) {
    const { rejectApplication } = this.props;
    rejectApplication(id);
  }

  render() {
    const { value } = this.props;
    return (
      <Application
        heroText="Your inbox applications"
        onFilterChange={this.onFilterChange}
        value={value}
        applicationType="inbox"
        titleLeft="Thing you have now"
        titleRight="Thing you are offered to get"
        onClickComplete={this.onClickComplete}
        onClickReject={this.onClickReject}
      />
    );
  }
}

const mapStateToProps = state => ({
  value: state.applications.inbox,
});

const mapDispatchToProps = dispatch => ({
  getInboxApplications: value => dispatch(getInboxApplications(value)),
  rejectApplication: id => dispatch(rejectApplication(id)),
  completeApplication: id => dispatch(completeApplication(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationInbox);
