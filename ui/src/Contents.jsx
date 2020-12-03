import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile.jsx';
import Homepage from './Homepage.jsx';

import LoginComponent from './LoginComponent';

export default class Contents extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { reloadPostList, resetReloadPostList } = this.props;
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" render={props => <Homepage {...props} reloadPostList={reloadPostList} resetReloadPostList={resetReloadPostList} />} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={LoginComponent} />
        {/* <Route path="/users/:userid" component={Profile} /> */}
      </Switch>
    );
  }
}
