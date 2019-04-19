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
      <div>
        <ul>
          <li>
            <Link to="/">Profile</Link>
          </li>
          <li>
            <Link to="/market">Market</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
          <li>
            <Link to="/addnewthink">AddNewThing</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>

        <button>Обменять </button>
        <button>Обменять </button>

        <hr />

        <Route exact path="/" component={Profile} />
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