import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './logout'
import store from '../store';

export default function NavBar(props) {
  if(props.user === null){
    return null;
  }

  let userName;
  if(store.getState().user.firstName) {
    userName = store.getState().user.firstName.toString() + ' ' + store.getState().user.lastName.toString();
    console.log(userName);
  } else {
    userName= null;
  }


  return(
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {/* <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
        </a>
        
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div> */}
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/profile" className="navbar-item">
            Profile
          </Link>
          <Link to="/addnewthink"  className="navbar-item">
            New thing
          </Link>
          <Link to="/market" className="navbar-item">
            Market
          </Link>
          <Link to="/registration" className="navbar-item">
            Registration
          </Link>
          <Link to="/login" className="navbar-item">
            Log in
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">
              Applications
            </div>
            <div className="navbar-dropdown">
              <Link to="/" className="navbar-item">
                inbox
              </Link>
              <Link to="/applicationOutbox" className="navbar-item">
                outbox
              </Link>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <p>{userName}</p>
          </div>
          <div className="navbar-item">
            <Logout/>
          </div>
        </div>
      </div>
    </nav>
    )
  }


