import React from 'react';
import { connect } from 'react-redux';
import ApplicationCard from '../ApplicationCard';
import FilterByStatus from '../FilterByStatus';
import Hero from '../../../components/Hero';
import CardBlock from '../../../components/CardBlock';
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
  };

  onClickCancel(id) {
    const { cancelApplication } = this.props;
    cancelApplication(id);
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
            applicationType='outbox'
            titleLeft='Thing you want to have'
            titleRight='Thing you want to change'
            onClickCancel={this.onClickCancel} />
        </div>
      )
    };

    return (
      <div>
        <br />
        <Hero text="Your outbox applications" type="hero is-primary" />
        <FilterByStatus onChange={this.onFilterChange}/>
        <CardBlock cardList={cardList} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  value: state.applications.outbox,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  getOutboxApplications: status => dispatch(getOutboxApplications(status)),
  cancelApplication: id => dispatch(cancelApplication(id)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationOutbox);

