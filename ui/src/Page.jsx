import React from 'react';
// import { NavLink } from 'react-router-dom';
import {
  Nav, NavDropdown, Navbar, NavItem, Container, Form, FormControl, Button, Row, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BsHeart } from 'react-icons/bs';
import { ImBubble2 } from 'react-icons/im';
import Contents from './Contents.jsx';

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Photo App Project
      </p>
    </small>
  );
}
function NavBar() {
  const inLoginPage = (window.location.pathname == '/login' || window.location.pathname == '/register');

  const profileDropdown = (
    <h4><AiOutlineUser /></h4>
  );
  return (
    <div>
      {inLoginPage? (
        <Navbar className="justify-content-center navBar" bg="light" expand="lg">
          <Navbar.Brand href="/">Photo App</Navbar.Brand> 
        </Navbar>
      ) : (
        <Navbar className="justify-content-center navBar" bg="light" expand="lg">
          <Navbar.Brand href="/">Photo App</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Nav>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer exact to="/"><Nav.Link><h3><AiOutlineHome /></h3></Nav.Link></LinkContainer>
              <LinkContainer exact to="/"><Nav.Link><h3><BsHeart /></h3></Nav.Link></LinkContainer>
              <LinkContainer exact to="/"><Nav.Link><h3><ImBubble2 /></h3></Nav.Link></LinkContainer>
              <LinkContainer exact to="/"><Nav.Link><h3><AiOutlineHome /></h3></Nav.Link></LinkContainer>

              <NavDropdown title={profileDropdown}>
                <LinkContainer exact to="/profile"><NavDropdown.Item href="#action/3.1">UserProfile</NavDropdown.Item></LinkContainer>

                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar.Collapse> 
        </Navbar>
      )} 
    </div>
  );
}

export default function Page() {
  return (
    <Container>
      <Row>
        <Col xs={1} md={0.5} />
        <Col xs={10} md={11}>
          <div>
            <NavBar />
            <hr />
            <Container>
              <Contents />
            </Container>
            <Footer />
          </div>
        </Col>
        <Col xs={1} md={0.5} />
      </Row>
    </Container>

  );
}
