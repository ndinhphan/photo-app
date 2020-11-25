import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile.jsx';
import Homepage from './Homepage.jsx';

export default class Contents extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log('contents reloadpostlist:', this.props.reloadPostList);
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" render={props => <Homepage {...props} reloadPostList={this.props.reloadPostList} resetReloadPostList={this.props.resetReloadPostList} />} />
        <Route path="/profile" component={Profile} />
        {/* <Route path="/users/:userid" component={Profile} /> */}
      </Switch>
    );
  }
}
