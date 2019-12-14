import React from 'react';
import { Route, withRouter } from "react-router-dom";
import Profile from './profile/Profile';
import Market from './market/Market';
import MarketFilteredByUser from './market/MarketFilteredByUser';
import ThingsForExchange from './market/exchange/ThingsForExchange'
import Login from './homePage/Login';
import AddNewThingForm from './addNewThing/AddNewThing';
import Logout from './navbar/Logout';
import RegistrationForm from './homePage/Registration';
import ApplicationOutbox from './application/outbox/ApplicationOutbox';
import ApplicationInbox from './application/inbox/ApplicatonInbox';
import HomePage from './homePage/HomePage';
import getCurrentUser from '../services/getCurrentUser'

function MainRouter(props) {
  getCurrentUser(props);

  return (
      <div>
        <Route exact path="/profile" component={Profile} />
        <Route path="/market" component={Market} />
        <Route path="/marketthingsfilteredbyuser" component={MarketFilteredByUser} />
        <Route path="/thingsforexchange" component={ThingsForExchange} />
        <Route path="/addnewthing" component={AddNewThingForm} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/registration" component={RegistrationForm} />
        <Route path="/applicationsoutbox" component={ApplicationOutbox} />
        <Route path="/applicationsinbox" component={ApplicationInbox} />
        <Route path="/home" component={HomePage} />
      </div>
  );
}

export default withRouter(MainRouter);
