import React from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import Profile from './profile/profile';
import Market from './market/market';
import Login from './login';
import AddNewThingForm from './form/add-new-thing-form';
import Logout from './logout';
import RegistrationForm from './form/registration-form';
import NavBar from './navbar'

function MainRouter(props) {
  const user = {name: "Ivan"};
  if (user === null && props.location.pathname !== "/registration"){
    props.history.push("/registration");
    return null;
  }
  return (
    <>
      <NavBar user={{name: "Ivan"}}/>

      <div>
        <Route exact path="/profile" component={Profile} />
        <Route path="/market" component={Market} />
        <Route path="/addnewthink" component={AddNewThingForm} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/registration" component={RegistrationForm} />
      </div>
    </>
  );
}

export default withRouter(MainRouter) ;