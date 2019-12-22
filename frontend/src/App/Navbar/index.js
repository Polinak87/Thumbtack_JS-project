import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import Logout from './Logout';
import User from './User';

function NavBar(props) {
  if (isEmpty(props.user)) {
    return null;
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/profile" className="navbar-item">
            Profile
          </Link>
          <Link to="/add-new-thing" className="navbar-item">
            New thing
          </Link>
          <Link to="/market" className="navbar-item">
            Market
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">Applications</div>
            <div className="navbar-dropdown">
              <Link to="/applications-inbox" className="navbar-item">
                inbox
              </Link>
              <Link to="/applications-outbox" className="navbar-item">
                outbox
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <User />
          <div className="navbar-item">
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  );
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NavBar);
