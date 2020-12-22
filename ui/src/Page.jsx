import React from 'react';
// import { NavLink } from 'react-router-dom';
import {
  Nav, NavDropdown, Navbar, NavItem, Container, Form, FormControl, Button, Row, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineHome, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';

// import { ImBubble2 } from 'react-icons/im';
import Contents from './Contents.jsx';
import CreatePostNavItem from './CreatePostNavItem.jsx';

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

export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      reloadPostList: false,
    };
    this.reloadPostList = this.reloadPostList.bind(this);
    this.resetReloadPostList = this.resetReloadPostList.bind(this);
  }
  /**
   * reloadPostList and resetReloadPostList is used to signal Homepage
   * to reload post list when CreatePostNavItem's handleSubmit is called
   */

  reloadPostList() {
    this.setState({ reloadPostList: true });
  }

  resetReloadPostList() {
    this.setState({ reloadPostList: false });
  }

  render() {
    const { reloadPostList } = this.state;
    return (
      <Container>
        <Row>
          <Col xs={1} md={0.5} />
          <Col xs={10} md={11}>
            <div>
              <NavBar reloadPostList={this.reloadPostList} />
              <hr />
              <Container>
                <Contents
                  reloadPostList={reloadPostList}
                  resetReloadPostList={this.resetReloadPostList}
                />
              </Container>
              <Footer />
            </div>
          </Col>
          <Col xs={1} md={0.5} />
        </Row>
      </Container>
    );
  }
}

function NavBar(props) {
  const profileDropdown = (
    <h4><AiOutlineUser /></h4>
  );
  const { reloadPostList } = props;
  let AdditionalNavBarItems;
  if (localStorage.getItem('AUTH_TOKEN')) {
    AdditionalNavBarItems = (
      <>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Nav>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavItem>
              <CreatePostNavItem reloadPostList={reloadPostList} />
            </NavItem>
            <LinkContainer exact to="/"><Nav.Link><h3><AiOutlineHome /></h3></Nav.Link></LinkContainer>
            <LinkContainer exact to="/"><Nav.Link><h3><AiOutlineHeart /></h3></Nav.Link></LinkContainer>
            <NavDropdown title={profileDropdown}>
              <LinkContainer exact to="/profile/1"><NavDropdown.Item href="#action/3.1">UserProfile</NavDropdown.Item></LinkContainer>
              <LinkContainer exact to="/image"><NavDropdown.Item href="#action/3.1">Image</NavDropdown.Item></LinkContainer>
              <NavDropdown.Item href="#action/3.3">Placeholder</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => { localStorage.removeItem('AUTH_TOKEN'); }} href="/login">Log out</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Placeholder</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </>
    );
  }
  return (
    <Navbar className="justify-content-center navBar" bg="light" expand="lg">
      <Navbar.Brand href="/">Photo App</Navbar.Brand>
      {AdditionalNavBarItems}
    </Navbar>
  );
}
