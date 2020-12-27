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

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      posts: [],
    };

    this.loadData = this.loadData.bind(this);
  }

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
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
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
    let userHeader;
    if (user) {
      userHeader = (
        <Card style={{ width: 'auto', height: 'auto', border: 0 }}>
          <Card.Body>
            <Row>
              <Col xs={2}><Card.Img responsive="true" variant="top" fluid="true" src={user.source} roundedCircle /></Col>
              <Col xs={6}>
                {' '}
                <LinkContainer to={`/profile/${user.id}`}><a><h6 id="username">{`${user.username}`}</h6></a></LinkContainer>
                <h6>{`${user.firstname} ${user.lastname}`}</h6>
                <h6>{`${user.description === null ? '' : user.description}`}</h6>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }
    return (
      <>
        <div>
          {userHeader}
        </div>
        <hr />
        <br />
        <>
          <Row>
            <br />
            <Col xs={9} md={6}>
              {postCards}
            </Col>
            <br />
          </Row>
        </>
      </>

    );
  }
}
