import React from 'react';
import ThingPage from './thingsPage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Profile from './profile';
import Market from './market';
import AddThink from './addthink';

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
            <Link to="/addthink">AddThink</Link>
          </li>
        </ul>

        <button>Обменять </button>
        <button>Обменять </button>

        <hr />

        <Route exact path="/" component={Profile} />
        <Route path="/market" component={Market} />
        <Route path="/addthink" component={AddThink} />
      </div>
    </Router>
  );
}

export default MainRouter;