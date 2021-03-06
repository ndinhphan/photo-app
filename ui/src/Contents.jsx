import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from './Profile.jsx';
import Homepage from './Homepage.jsx';
import Register from './Register.jsx';
import Login from './Login.jsx';
import Settings from './Settings.jsx';
import PostPage from './PostPage.jsx';
const service = require('./perService');

export default class Contents extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async authorize() {
    if (localStorage.getItem('AUTH_TOKEN')) {
      console.log('has token');
      await service.authorize();
    }
  }
  render() {
    this.authorize();

    const { reloadPostList, resetReloadPostList } = this.props;
    return (
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" render={props => <Homepage {...props} reloadPostList={reloadPostList} resetReloadPostList={resetReloadPostList} />} />
        <Route path="/profile/:userId" render={props => <Profile {...props} reloadPostList={reloadPostList} resetReloadPostList={resetReloadPostList} />} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/settings" component={Settings} />
        <Route path="/posts/:postId" component={PostPage} />


        {/* <Route path="/users/:userid" component={Profile} /> */}
      </Switch>
    );
  }
}
