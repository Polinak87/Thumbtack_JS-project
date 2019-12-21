import React from 'react';
import { connect } from 'react-redux';
import ApplicationCard from '../ApplicationCard';
import FilterByStatus from '../FilterByStatus';
import Hero from '../../../components/Hero';
import CardBlock from '../../../components/CardBlock';
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
    let cardList = [];
    const { value } = this.props;

    for (let application of value.values()) {
      const { id } = application;
      cardList.push(
        <div className="column is-one-third" key={id}>
          <ApplicationCard
            application={application}
            applicationType="inbox"
            titleLeft="Thing you have now"
            titleRight="Thing you are offered to get"
            onClickComplete={this.onClickComplete}
            onClickReject={this.onClickReject}
          />
        </div>,
      );
    }

    return (
      <div>
        <br />
        <Hero text="Your inbox applications" type="hero is-primary" />
        <FilterByStatus onChange={this.onFilterChange}/>
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
  rejectApplication: id => dispatch(rejectApplication(id)),
  completeApplication: id => dispatch(completeApplication(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationInbox);
