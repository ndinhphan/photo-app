import React from 'react';
import {
  Form, FormControl, FormGroup, FormLabel, Button, Modal,
  NavItem, ButtonToolbar, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Toast from './Toast.jsx';
import graphQLFetch from './graphQLFetch.js';

class CreatePostNavItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showing: false,
      toastMessage: '',
      toastType: 'error',
      toastVisible: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'error' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async handleSubmit(e) { /* e is the submit event */
    e.preventDefault();
    this.hideModal();
    const { reloadPostList } = this.props;
    // the form name is createPost
    const form = document.forms.createPost;
    // post userid and username is static
    const post = {
      userid: 2,
      username: 'janedoe',
      source: form.source.value,
      description: form.description.value,
      visibility: 'Public',
    };
    const query = `mutation postCreate(
        $post: PostInputs
      ){
      postCreate(
        post: $post
      ){
        id userid username source description
      }
    }`;
    const data = await graphQLFetch(query, { post }, this.showError);
    if (data) {
      // const { history } = this.props;
      // history.push(`/edit/${data.postCreate.id}`);
      reloadPostList();
    }
  }


  render() {
    const {
      showing, toastMessage, toastType, toastVisible,
    } = this.state;
    return (
      <>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger delay={1000} placement="left" overlay={<Tooltip id="create-post">Create Post</Tooltip>}>
            <h1><AiOutlinePlusCircle /></h1>
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModel}>
          <Modal.Header closeButton onHide={this.hideModel}>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="createPost">
              <FormGroup>
                <FormLabel>Source placeholder</FormLabel>
                <FormControl type="text" name="source" autoFocus />
              </FormGroup>
              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormControl type="text" name="description" autoFocus />
              </FormGroup>
              <Form.Group>
                <Form.Label>Visibility:</Form.Label>
                <Form.Control as="select" type="visibility">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button type="button" variant="primary" onClick={this.handleSubmit}>Submit</Button>
              <Button type="button" variant="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>

        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          variant={toastType}
        >
          {toastMessage}
        </Toast>
      </>
    );
  }
}
export default withRouter(CreatePostNavItem);

// IssueAdd.propTypes = {
//   createIssue: PropTypes.func.isRequired,
// };
