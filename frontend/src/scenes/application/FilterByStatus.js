import React from 'react';
import store from '../../store/index';
import { connect } from 'react-redux';
import { getInboxApplications } from '../../store/actions/inboxApplications';

class FilterByStatus extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.props.getInboxApplications(event.target.value);
  }

  render() {
    return (
      <div className="field">
        <div className="control is-expanded">
          <div className="is-inline select is-primary">
            <select onChange={this.onChange}>
              <option key="all" value="all">
                all
              </option>
              <option key="completed" value="completed">
                completed
              </option>
              <option key="rejected" value="rejected">
                rejected
              </option>
              <option key="pending" value="pending">
                pending
              </option>
              <option key="canceled" value="canceled">
                canceled
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getInboxApplications: status => dispatch(getInboxApplications(status)),
});

export default connect(mapDispatchToProps)(FilterByStatus);
