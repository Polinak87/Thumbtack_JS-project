import React from 'react';
import { connect } from 'react-redux';
const _ = require('lodash');


class User extends React.Component {
  render() {
    console.log('this.props.user');
    console.log(this.props);
    if (_.isEmpty(this.props.user)) {
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