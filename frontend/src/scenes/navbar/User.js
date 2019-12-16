import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

class User extends React.Component {
  render() {
    if (isEmpty(this.props.user)) {
      return null;
    }
    return (
      <div className="navbar-item">
        <p>{this.props.user.firstName.toString() + ' ' + this.props.user.lastName.toString()}</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(User);
