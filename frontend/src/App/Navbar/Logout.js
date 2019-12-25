import React from 'react';
import { connect } from 'react-redux';
import Button, { light } from '../../components/Button';
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
      <Button to='/home' className={light} onClick={this.onClick} value="Log out" />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);

