import React from 'react';
import URLSearchParams from 'url-search-params';

import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Card, Accordion, Button, Row, Col, Image,
} from 'react-bootstrap';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Row>
          <Col xs={12} md={8}>
            <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
              <Card.Header>
                <Row>
                  <Col xs={-1}><Image fluid responsive src="https://via.placeholder.com/50" exact to="/profile" roundedCircle /></Col>
                  <Col xs={0}><h6>user</h6></Col>
                  <Col xs={6} />
                </Row>
              </Card.Header>
              <Card.Img responsive variant="top" fluid src="https://via.placeholder.com/650" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the cards content.
                </Card.Text>
              </Card.Body>
            </Card>
            <br />

            <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
              <Card.Header>
                <Row>
                  <Col xs={3} md={2}><Image fluid responsive src="https://via.placeholder.com/50" exact to="/profile" roundedCircle /></Col>
                  <h6>user</h6>
                </Row>
              </Card.Header>
              <Card.Img responsive variant="top" fluid src="https://via.placeholder.com/650" />
              <Card.Body>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the cards content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={2} md={4}>
            <Card border="secondary" style={{ width: 'auto', height: 'auto', border: 0 }}>
              <Card.Body>
                <Row>
                  <Col xs={3}><Image fluid responsive src="https://via.placeholder.com/50" exact to="/profile" roundedCircle /></Col>
                  <Col xs={6}><h6>user</h6></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </>

    );
  }
}
