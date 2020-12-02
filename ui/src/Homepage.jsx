/* eslint-disable no-unused-vars */
import React from 'react';
import URLSearchParams from 'url-search-params';

import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Card, Accordion, Button, Row, Col, Image,
} from 'react-bootstrap';
import Post from './Post.jsx';
import graphQLFetch from './graphQLFetch.js';

export default class Profile extends React.Component {
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

  componentDidUpdate(prevProps) {
    const { reloadPostList, resetReloadPostList } = this.props;
    if (prevProps.reloadPostList !== reloadPostList) {
      this.loadData();
      resetReloadPostList();
    }
  }

  async loadData() {
    const query = `query {
      postList(visibility: Public) {
        id
        source
        description
        visibility
        createdAt
        userId
        author {
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
      }
    }
    `;
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ posts: data.postList });
    }
  }

  render() {
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
            <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
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
            <br />
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
