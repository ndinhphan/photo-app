import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile.jsx';
import Homepage from './Homepage.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';


export default function Contents() {

  return (
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Homepage} />
      <Route path="/profile" component={Profile} />
      {/* <Route path="/users/:userid" component={Profile} /> */}
    </Switch>
  );
}
