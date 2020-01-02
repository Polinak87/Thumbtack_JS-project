import React from 'react';
import { Route } from 'react-router-dom';
import startingPage from '../scenes/StartingPage';
import Login from '../scenes/StartingPage/Login';
import RegistrationForm from '../scenes/StartingPage/Registration';
import Logout from './Navbar/Logout';
import Profile from '../scenes/Profile';
import AddNewThingForm from '../scenes/AddNewThing';
import Market from '../scenes/Market';
import MarketFilteredByUser from '../scenes/Market/MarketFilteredByUser';
import ThingsForExchange from '../scenes/Market/Exchange';
import ApplicationOutbox from '../scenes/Application/Outbox';
import ApplicationInbox from '../scenes/Application/Inbox';

export default function Routers(props) {
  return (
    <div>
      <Route path="/home" component={startingPage}/>
      <Route path="/login" component={Login}/>
      <Route path="/registration" component={RegistrationForm}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/add-new-thing" component={AddNewThingForm}/>
      <Route path="/market" component={Market}/>
      <Route path="/market-things-filtered-by-user" component={MarketFilteredByUser}/>
      <Route path="/things-for-exchange" component={ThingsForExchange}/>
      <Route path="/applications-outbox" component={ApplicationOutbox}/>
      <Route path="/applications-inbox" component={ApplicationInbox}/>
    </div>
  );
}
