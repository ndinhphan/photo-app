/* eslint-disable no-unused-vars */
import React from 'react';
import URLSearchParams from 'url-search-params';

import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Card, Accordion, Button, Row, Col, Image, CardDeck,
} from 'react-bootstrap';

async function loadData() {
    let userId;
    
    await fetch('/api/home', {
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
