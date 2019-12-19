import React from 'react';
import { Route, withRouter } from "react-router-dom";
import Profile from './scenes/profile/Profile';
import Market from './scenes/market/Market';
import MarketFilteredByUser from './scenes/market/MarketFilteredByUser';
import ThingsForExchange from './scenes/exchange/ThingsForExchange'
import Login from './scenes/homePage/Login';
import AddNewThingForm from './scenes/addNewThing/AddNewThing';
import Logout from './scenes/navbar/Logout';
import RegistrationForm from './scenes/homePage/Registration';
import ApplicationOutbox from './scenes/application/outbox/ApplicationOutbox';
import ApplicationInbox from './scenes/application/inbox/ApplicatonInbox';
import HomePage from './scenes/homePage/HomePage';
import getCurrentUser from './services/getCurrentUser'

function Routers(props) {
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

export default withRouter(Routers);
