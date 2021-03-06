import React from 'react';
import { connect } from 'react-redux';
import Applications from '../Aplications';
import {
  getInboxApplications,
  rejectApplication,
  completeApplication,
} from '../../../store/actions/applications';

class ApplicationInbox extends React.Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onClickReject = this.onClickReject.bind(this);
    this.onClickComplete = this.onClickComplete.bind(this);
  }

  componentDidMount() {
    const { getInboxApplications } = this.props; 
    getInboxApplications('all');
  }

  onFilterChange() {
    const { getInboxApplications } = this.props;
    getInboxApplications(event.target.value);
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
    const { applicationsMap } = this.props;
    return (
      <Applications
        heroText="Your inbox applications"
        onFilterChange={this.onFilterChange}
        applicationsMap={applicationsMap}
        applicationType="inbox"
        titleLeft="Thing you have now"
        titleRight="Thing you can get"
        onClickComplete={this.onClickComplete}
        onClickReject={this.onClickReject}
      />
    );
  }
}

const mapStateToProps = state => ({
  applicationsMap: state.applications.inbox,
});

const mapDispatchToProps = dispatch => ({
  getInboxApplications: value => dispatch(getInboxApplications(value)),
  rejectApplication: id => dispatch(rejectApplication(id)),
  completeApplication: id => dispatch(completeApplication(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationInbox);
