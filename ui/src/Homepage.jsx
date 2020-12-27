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

export default class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      user: {},
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
    // await fetch('/api/service', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     token: localStorage.getItem('AUTH_TOKEN'),
    //   }),
    // })
    //   .then(response => response.json())
    //   .then((response) => {
    //     console.log(response);
    //     if (!response.authorized) window.location.href = '/login';
    //     else userId = response.userId;
    //   });

    // const query = `query {
    //   postList(visibility: Public) {
    //     id
    //     source
    //     description
    //     visibility
    //     createdAt
    //     userId
    //     author {
    //       id
    //       source
    //       firstname
    //       lastname
    //       username
    //     }
    //     comments {
    //       id
    //       content
    //       createdAt
    //       author {
    //         source
    //         username
    //         firstname
    //         lastname
    //       }
    //     }
    //     postlikes{
    //       userId
    //     }
    //   }
    // }
    // `;
    const query = `query{
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
    }`;
    const queryUser = `query user($id: Int!) {
      user(id: $id) {
        firstname
        username
        lastname
        source
        description
        createdAt
        id
      }
    }`;
    const vars = { id: userId };
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ posts: data.postList });
    }
    const userdata = await graphQLFetch(queryUser, vars);
    if (data) {
      this.setState({ user: userdata.user });
    }
  }

  render() {
    if (!localStorage.getItem('AUTH_TOKEN')) return (<Switch><Redirect from="/home" to="/login" /></Switch>);

    const { posts, user } = this.state;
    let postCards;
    if (posts.length > 0) {
      postCards = posts.map(post => (
        <Post post={post} key={post.id} HomepageloadData={this.loadData} />
      ));
    }
    let userCard = '';
    if (user.username && user.source) {
      userCard = (
        <Card border="secondary" style={{ width: 'auto', height: 'auto', border: 'secondary' }}>
          <Card.Body>
            <Row>
              <Col xs={-1}><Image fluid="true" responsive="true" src={user.source} roundedCircle /></Col>
              <Col xs={0}>
                {' '}
                <LinkContainer to={`/profile/${user.id}`}><a><h6 id="username">{`${user.username}`}</h6></a></LinkContainer>
                <h6>{`${user.firstname} ${user.lastname}`}</h6>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
    }

    // console.log(user);
    return (
      <>
        <Row>
          <Col xs={12} md={8}>
            {postCards}
          </Col>
          <Col xs={2} md={4}>
            <div className="userBar">
              { userCard }
            </div>
          </Col>
        </Row>
      </>

    );
  }
}
