import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout'

export default function NavBar(props) {
  console.log(props.user);
  if (props.user.name === null) {
    return null;
  }

  const { user } = props;

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/profile" className="navbar-item">
            Profile
          </Link>
          <Link to="/addnewthing" className="navbar-item">
            New thing
          </Link>
          <Link to="/market" className="navbar-item">
            Market
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              Applications
            </div>
            <div className="navbar-dropdown">
              <Link to="/applicationsinbox"  className="navbar-item">
                inbox
              </Link>
              <Link to="/applicationsoutbox" className="navbar-item">
                outbox
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <p>{user.name}</p>
          </div>
          <div className="navbar-item">
            <Logout />
          </div>
        </div>
      </div>
    </nav>
  )
}


