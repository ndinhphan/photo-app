import React from 'react';
import {
  Form, FormControl, FormGroup, FormLabel, Button, Modal,
  NavItem, ButtonToolbar, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import firebase from 'firebase';
import Toast from './Toast.jsx';
import graphQLFetch from './graphQLFetch.js';


// import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAy0LYYRq6AGIZ7mmRpKwCtpzr9d7y-K9o',
  authDomain: 'photo-app-c5f41.firebaseapp.com',
  databaseURL: 'https://photo-app-c5f41.firebaseio.com',
  projectId: 'photo-app-c5f41',
  storageBucket: 'photo-app-c5f41.appspot.com',
  messagingSenderId: '1008326348104',
  appId: '1:1008326348104:web:47b3e5517266ad95e3b77d',
  measurementId: 'G-W0C6R2H572',
};

firebase.initializeApp(firebaseConfig);

class CreatePostNavItem extends React.Component {
  constructor() {
    super();
    this.state = {
      showing: false,

      toastMessage: '',
      toastType: 'error',
      toastVisible: false,

      files: null,
      preview: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  // firebase functions
  componentDidMount() {
    const { preview } = this.state;
    URL.revokeObjectURL(preview);
  }


  getImage() {
    const { files } = this.state;
    const storageRef = firebase.storage().ref();
    return storageRef.child(`images/${files[0].name}`).getDownloadURL();
    // storageRef.child(`images/${this.state.files[0].name}`).getDownloadURL().then((url) => {
    //   console.log(url);
    //   document.getElementById('new-img').src = url;
    // });
  }

  handleSave() {
    const bucketName = 'images';
    const { files } = this.state;
    const file = files[0];
    console.log('file from handlesave:', file);
    let downloadURL;
    const storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    const uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        downloadURL = uploadTask.snapshot;
      });
    return true;
  }

  handleChange(files) {
    if (!files || files.length === 0) {
      return;
    }
    const preview = URL.createObjectURL(files[0]);
    this.setState({
      files, preview,
    });
  }


  // toast functions
  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'warning' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    const { preview } = this.state;
    URL.revokeObjectURL(preview);
    this.setState({ showing: false, preview: null });
  }

  // component functions
  async handleSubmit(e) { /* e is the submit event */
    e.preventDefault();
    this.hideModal();
    const { reloadPostList } = this.props;
    const { files } = this.state;
    console.log('handlesubmit called');
    console.log('files are', files);
    // the form name is createPost


    const form = document.forms.createPost;
    // post userid and username is static
    const query = `mutation postCreate(
        $post: PostInputs
      ){
      postCreate(
        post: $post
      ){
        id
        source
        description
        visibility
        createdAt
        userId
        author{
          username
          firstname
          lastname
        }
      }
    }`;
    let url = '';

    // if (await this.handleSave()) {
    //   console.log('after handlesave');
    //   url = await this.getImage();
    //   console.log(url);
    // }
    // const post = {
    //   userId: 2,
    //   source: url,
    //   description: form.description.value,
    //   visibility: 'Public',
    // };
    const post = {
      userId: 2,
      source: form.source.value,
      description: form.description.value,
      visibility: 'Public',
    };
    const data = await graphQLFetch(query, { post }, this.showError);
    if (data) {
      // const { history } = this.props;
      // history.push(`/edit/${data.postCreate.id}`);
      // const { preview } = this.state;
      // URL.revokeObjectURL(preview);
      reloadPostList();
      this.setState({ preview: null, files: null });
      console.log('post submitted, files should be empty: files:', this.state.files);
    }
  }

  render() {
    const {
      showing, toastMessage, toastType, toastVisible, preview,
    } = this.state;
    return (
      <>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger delay={1000} placement="left" overlay={<Tooltip id="create-post">Create Post</Tooltip>}>
            <h1><AiOutlinePlusCircle /></h1>
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton onHide={this.hideModal}>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="createPost">
              <FormGroup>
                <FormLabel>Source placeholder</FormLabel>
                <FormControl type="text" name="source" autoFocus />
              </FormGroup>
              <div>
                <input type="file" onChange={(e) => { this.handleChange(e.target.files); }} />
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.showImage}>Show Image</button>
                <img id="new-img" />
                <img src={preview} />
              </div>
              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormControl as="textarea" name="description" autoFocus />
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
              <Button type="submit" variant="primary" onClick={this.handleSubmit}>Submit</Button>
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
