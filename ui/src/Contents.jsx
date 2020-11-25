import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile.jsx';
import Homepage from './Homepage.jsx';

export default class Contents extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // console.log('contents reloadpostlist:', this.props.reloadPostList);
    const { reloadPostList, resetReloadPostList } = this.props;
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" render={props => <Homepage {...props} reloadPostList={reloadPostList} resetReloadPostList={resetReloadPostList} />} />
        <Route path="/profile" component={Profile} />
        {/* <Route path="/users/:userid" component={Profile} /> */}
      </Switch>
    );
  }
}
