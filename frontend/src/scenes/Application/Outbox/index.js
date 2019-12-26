import React from 'react';
import { connect } from 'react-redux';
import Application from '../Aplication';
import { getOutboxApplications } from '../../../store/actions/applications';
import { cancelApplication } from '../../../store/actions/applications';

class ApplicationOutbox extends React.Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
  }

  onFilterChange() {
    this.props.getOutboxApplications(event.target.value);
  }

  componentDidMount() {
    this.props.getOutboxApplications('all');
  }

  onClickCancel(id) {
    const { cancelApplication } = this.props;
    cancelApplication(id);
  }

  render() {
    const { applicationsMap } = this.props;
    return (
      <Application
        heroText="Your outbox applications"
        onFilterChange={this.onFilterChange}
        applicationsMap={applicationsMap}
        applicationType="outbox"
        titleLeft="Thing you want to have"
        titleRight="Thing you want to change"
        onClickComplete={this.onClickComplete}
        onClickCancel={this.onClickCancel}
      />
    );
  }
}

const mapStateToProps = state => ({
  applicationsMap: state.applications.outbox,
});

const mapDispatchToProps = dispatch => ({
  getOutboxApplications: status => dispatch(getOutboxApplications(status)),
  cancelApplication: id => dispatch(cancelApplication(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationOutbox);
