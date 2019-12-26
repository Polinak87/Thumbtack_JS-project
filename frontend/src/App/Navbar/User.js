import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';

class User extends React.Component {
  render() {
    const { user } = this.props;
    if (isEmpty(user)) {
      return null;
    }

    const { firstName, lastName } = user;
    return (
      <div className="navbar-item">
        <p>{`${firstName.toString()} ${lastName.toString()}`}</p>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(User);
