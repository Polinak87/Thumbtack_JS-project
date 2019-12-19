import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/actions/user';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    event.preventDefault();
    const { logout } = this.props;
    logout();
  }

  render() {
    return (
      <Link to='/home' button className="button is-light" onClick={this.onClick}>Log out</Link>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  dispatch,
});

export default connect(null, mapDispatchToProps)(Logout);

