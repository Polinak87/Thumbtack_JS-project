import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import Profile from './profile/profile';
import Market from './market/market';
import ThingsForChange from './exchange/thingsForChange'
import Login from './login';
import AddNewThingForm from './form/add-new-thing-form';
import Logout from './logout';
import RegistrationForm from './form/registration-form';
import NavBar from './navbar';
import ApplicationOutbox from './application/outbox/applicationOutbox'
import store from '../store';
import HomePage from './homePage';
const _ = require('lodash');

function MainRouter(props) {

  let userName;
  console.log(_.isEmpty(store.getState().user));
  if(_.isEmpty(store.getState().user)) {
    userName = null;
  } else {
    userName = store.getState().user.firstName.toString() + ' ' + store.getState().user.lastName.toString();
  };

  if (userName === null && props.location.pathname !== "/login") {
    if(userName === null && props.location.pathname !== "/home") {
      if(userName === null && props.location.pathname !== "/registration") {
      props.history.push("/home");
      return null;
      }
    }
  };

  return (
    <>
      <NavBar user={{name: userName}}/>

      <div>
        <Route exact path="/profile" component={Profile} />
        <Route path="/market" component={Market} />
        <Route path="/thingsforchange" component={ThingsForChange} />
        <Route path="/addnewthink" component={AddNewThingForm} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/registration" component={RegistrationForm} />
        <Route path="/applicationOutbox" component={ApplicationOutbox} />
        <Route path="/home" component={HomePage} />
      </div>
    </>
  );
}

export default withRouter(MainRouter) ;