import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Profile from './profile';
import Market from './market';
import Login from './login';
import AddNewThingForm from './form/add-new-thing-form';
import Logout from './logout';
import RegistrationForm from './form/registration-form';

function MainRouter() {
  return (
    <Router>

      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
          </a>
          
          <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/profile">
              Profile
            </a>
            <a className="navbar-item" href="/addnewthink">
              New thing
            </a>
            <a className="navbar-item" href="/market">
              Market
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Applications
              </a>

              <div className="navbar-dropdown">
                <a className="navbar-item">
                  inbox
                </a>
                <a className="navbar-item">
                  outbox
                </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light" href="/logout">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <Route exact path="/profile" component={Profile} />
        <Route path="/market" component={Market} />
        <Route path="/addnewthink" component={AddNewThingForm} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/registration" component={RegistrationForm} />
      </div>
    </Router>
  );
}

export default MainRouter;