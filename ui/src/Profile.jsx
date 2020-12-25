/* eslint-disable no-unused-vars */
import React from 'react';
import URLSearchParams from 'url-search-params';

import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Card, Accordion, Button, Row, Col, Image, CardDeck,
} from 'react-bootstrap';
import Post from './Post.jsx';
import graphQLFetch from './graphQLFetch.js';

<<<<<<< HEAD
async function loadData() {
    let userId;

    await fetch('/api/service', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        token: localStorage.getItem('AUTH_TOKEN')
    })
  })
  .then(response => response.json())
  .then(response => {
      console.log(response);
      if (!response.authorized) window.location.href = '/login'
      else userId = response.userId
    });

  //TODO: Load profile data
}
export default function Profile() {
  return (
    <>
      <>
        <CardDeck>
          <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
            <Card.Img responsive variant="top" fluid src="https://via.placeholder.com/650" />
          </Card>

          <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
            <Card.Img responsive variant="top" fluid src="https://via.placeholder.com/650" />
          </Card>

          <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
            <Card.Img responsive variant="top" fluid src="https://via.placeholder.com/650" />
          </Card>

        </CardDeck>
        <br />
=======
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],
    };
  }
>>>>>>> master

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { reloadPostList, resetReloadPostList } = this.props;
    const { posts } = this.state;
    const { posts: prevPosts } = prevState;
    if (posts.length !== prevPosts.length) this.loadData();
    if (prevProps.reloadPostList !== reloadPostList) {
      this.loadData();
      resetReloadPostList();
    }
  }

  async loadData() {
    const query = `query user($id: Int!) {
      user(id: $id) {
        firstname
        username
        lastname
        source
        description
        createdAt
        posts{
          id
          source
          description
          visibility
          createdAt
          userId
        }
      }
    }`;
    const { match: { params: { userId: queryId } } } = this.props;
    const id = parseInt(queryId, 10);
    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ user: data.user, posts: data.user.posts });
    }
  }

  render() {
    const { user, posts } = this.state;
    console.log(posts);
    let postCards;
    if (posts.length > 0) {
      postCards = posts.map(post => (
        <Post post={post} key={post.id} onProfile />
      ));
    }
    return (
      <>
        <div>
          <h3>{`placeholder for ${user.username}'s profile`}</h3>
          <h5>{JSON.stringify(user)}</h5>
        </div>
        <>
          <CardDeck>
            {postCards}
          </CardDeck>
        </>


      </>

    );
  }
}
