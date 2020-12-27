/* eslint-disable no-unused-vars */
import React from 'react';
import URLSearchParams from 'url-search-params';
import Switch from 'react-bootstrap/esm/Switch';
import { Redirect, Route } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import {
  Card, Accordion, Button, Row, Col, Image,
} from 'react-bootstrap';
import Post from './Post.jsx';
import graphQLFetch from './graphQLFetch.js';
// import authAndGetID from './perService';
const service = require('./perService');

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
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
    const userId = await service.authAndGetID();
    console.log(userId);

    const query = `query {
      postList(visibility: Public) {
        id
        source
        description
        visibility
        createdAt
        userId
        author {
          id
          source
          firstname
          lastname
          username
        }
        comments {
          id
          content
          createdAt
          author {
            source
            username
            firstname
            lastname
          }
        }
        postlikes{
          userId
        }
      }
    }
    `;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ posts: data.postList });
    }
  }

  render() {
    if (!localStorage.getItem('AUTH_TOKEN')) return (<Switch><Redirect from="/home" to="/login" /></Switch>);

    const { posts } = this.state;
    let postCards;
    if (posts.length > 0) {
      postCards = posts.map(post => (
        <Post post={post} key={post.id} HomepageloadData={this.loadData} />
      ));
    }
    return (
      <>
        <Row>
          <Col xs={12} md={8}>
            {/* <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
              <Card.Header>
                <Row>
                  <Col xs={-1}><Image responsive="true" src="https://via.placeholder.com/50" exact="true" to="/profile" roundedCircle /></Col>
                  <Col xs={0}><h6>user</h6></Col>
                  <Col xs={6} />
                </Row>
              </Card.Header>
              <Card.Img responsive="true" variant="top" src="https://via.placeholder.com/650" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  This post is static and is not created from database
                </Card.Text>
              </Card.Body>
            </Card>
            <br /> */}
            {postCards}
          </Col>
          <Col xs={2} md={4}>
            <div className="userBar">
              <Card border="secondary" style={{ width: 'auto', height: 'auto', border: 0 }}>
                <Card.Body>
                  <Row>
                    <Col xs={-1}><Image responsive="true" src="https://via.placeholder.com/50" exact="true" to="/profile" roundedCircle /></Col>
                    <Col xs={0}><h6>user</h6></Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </>

    );
  }
}
