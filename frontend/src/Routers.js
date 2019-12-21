import React from 'react';
import { Route } from "react-router-dom";
import startingPage from './scenes/startingPage';
import Login from './scenes/startingPage/login';
import RegistrationForm from './scenes/startingPage/registration';
import Logout from './scenes/navbar/Logout';
import Profile from './scenes/profile';
import AddNewThingForm from './scenes/addNewThing';
import Market from './scenes/market';
import MarketFilteredByUser from './scenes/market/MarketFilteredByUser';
import ThingsForExchange from './scenes/market/exchange'
import ApplicationOutbox from './scenes/application/outbox';
import ApplicationInbox from './scenes/application/inbox';

export default function Routers(props) {

  return (
    <div>
      <Route path="/home" component={startingPage} />
      <Route path="/login" component={Login} />
      <Route path="/registration" component={RegistrationForm} />
      <Route path="/logout" component={Logout} />
      <Route path="/profile" component={Profile} />
      <Route path="/addnewthing" component={AddNewThingForm} />
      <Route path="/market" component={Market} />
      <Route path="/marketthingsfilteredbyuser" component={MarketFilteredByUser} />
      <Route path="/thingsforexchange" component={ThingsForExchange} />
      <Route path="/applicationsoutbox" component={ApplicationOutbox} />
      <Route path="/applicationsinbox" component={ApplicationInbox} />
    </div>
  );
}

