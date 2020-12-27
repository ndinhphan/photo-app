/* eslint-disable no-unused-vars */
import React from 'react';
import URLSearchParams from 'url-search-params';

import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Card, Button, Row, Col, Image, CardDeck, FormControl, Form, FormGroup, FormLabel, ButtonToolbar,
} from 'react-bootstrap';
import graphQLFetch from './graphQLFetch.js';
import firebase from './firebase.js';
import Toast from './Toast.jsx';

export default class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      files: null,
      preview: null,

      toastMessage: '',
      toastType: 'success',
      toastVisible: false,
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeAvatar = this.onChangeAvatar.bind(this);

    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount() {
    this.loadData();
    const { preview } = this.state;
    // this.setState({ preview: null });
    URL.revokeObjectURL(preview);
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    // console.log(event.target.value);
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState((prevState => ({
      user: { ...prevState.user, [name]: value },
    })));
  }

  onChangeAvatar(files) {
    if (!files || files.length === 0) {
      return;
    }
    const preview = URL.createObjectURL(files[0]);
    this.setState({
      files, preview,
    });
  }

  async handleSave(files) {
    if (!files || files.length === 0) {
      return;
    }
    const bucketName = 'images';
    // const { files } = this.state;
    const file = files[0];
    const storageRef = await firebase.storage().ref(`${bucketName}/${file.name}`);
    await storageRef.put(file).then(async () => {
      const storageRef2 = await firebase.storage().ref();
      storageRef2.child(`images/${file.name}`).getDownloadURL().then((url) => {
        this.setState((prevState => ({
          user: { ...prevState.user, source: url },
        })));
      });
    });
  }

  async loadData() {
    console.log('loaddata called');
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
    const query = `query user($id: Int!) {
      user(id: $id) {
        firstname
        username
        lastname
        source
        description
        email
      }
    }`;
    const id = parseInt(userId, 10);
    const data = await graphQLFetch(query, { id });
    if (data) {
      this.setState({ user: data.user, preview: data.user.source });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { user } = this.state;
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
    const query = `mutation userUpdate(
      $id:Int!
      $changes: UserUpdateInputs!
    ){
      userUpdate(
        id: $id
        changes: $changes
      ){
        firstname
        username
        lastname
        source
        description
        email
      }
    }`;
    // deconstruct issue to get id and created, then the rest is collected into the changes variable
    const { ...changes } = user;
    // fetch from graphql issueUpdate
    const data = await graphQLFetch(query, { id: userId, changes }, this.showError);
    if (data) {
      this.setState({ user: data.userUpdate });
      this.showSuccess('Profile details updated!');
    }
  }

  // toast functions
  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({
      toastVisible: false,
    });
  }

  render() {
    const { user, preview } = this.state;
    const {
      toastMessage, toastType, toastVisible,
    } = this.state;
    let userHeader;
    // if (user) {
    //   userHeader = (
    //     <Card style={{ width: 'auto', height: 'auto', border: 0 }}>
    //       <Card.Body>
    //         <Row>
    //           <Col xs={2}><Card.Img responsive="true" variant="top" fluid="true" src={user.source} roundedCircle /></Col>
    //           <Col xs={6}>
    //             {' '}
    //             <LinkContainer to={`/profile/${user.id}`}><a><h6 id="username">{`${user.username}`}</h6></a></LinkContainer>
    //             <h6>{`${user.firstname} ${user.lastname}`}</h6>
    //             <h6>{`${user.description === null ? '' : user.description}`}</h6>
    //           </Col>
    //         </Row>
    //       </Card.Body>
    //     </Card>
    //   );
    // }
    return (
      <Card>
        <Card.Header>
          <Card.Title>Settings</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormGroup>
              <Col as={FormLabel} sm={3}>Avatar</Col>
              <Col sm={9}>
                <Col xs={6}><Card.Img responsive="true" variant="top" fluid="true" src={user.source} /></Col>
                <div>
                  <input type="file" onChange={(e) => { this.handleSave(e.target.files); }} />
                </div>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col as={FormLabel} sm={3}>Username</Col>
              <Col sm={9}>
                <FormControl disabled value={user.username} />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col as={FormLabel} sm={3}>First Name</Col>
              <Col sm={9}>
                <FormControl
                  size={50}
                  name="firstname"
                  onChange={this.onChange}
                  value={user.firstname}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col as={FormLabel} sm={3}>Last Name</Col>
              <Col sm={9}>
                <FormControl
                  size={50}
                  name="lastname"
                  onChange={this.onChange}
                  value={user.lastname}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col as={FormLabel} sm={3}>Description</Col>
              <Col sm={9}>
                <FormControl
                  size={50}
                  name="description"
                  value={user.description}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col as={FormLabel} sm={3}>Email</Col>
              <Col sm={9}>
                <FormControl
                  size={50}
                  name="email"
                  value={user.email}
                  onChange={this.onChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={6}>
                <ButtonToolbar>
                  <Button variant="primary" type="submit">Submit</Button>
                </ButtonToolbar>
              </Col>
            </FormGroup>
          </Form>
        </Card.Body>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          variant={toastType}
        >
          {toastMessage}
        </Toast>
      </Card>

    );
  }
}
