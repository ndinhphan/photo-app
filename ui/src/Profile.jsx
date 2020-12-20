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
    const data = graphQLFetch(query, { id });
  }

  render() {
    const { match: { params: { userId } } } = this.props;
    return (
      <>
        {userId}
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
        </>


      </>

    );
  }
}
