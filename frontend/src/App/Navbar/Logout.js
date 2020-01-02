import React from 'react';
import { connect } from 'react-redux';
import Button, { light } from '../../components/Button';
import { logout } from '../../store/actions/user';

function Logout(props) {
  const onClick = () => {
    const { logout } = props;
    logout();
  }

  return (
    <Button to="/home" className={light} onClick={onClick}>
      Log out
    </Button>
  );
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);
