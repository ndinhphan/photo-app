import React from 'react';
import {
  Row, Col, Dropdown, Form, Button, ButtonToolbar,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { AiOutlineMore } from 'react-icons/ai';
import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.jsx';
const service = require('./perService');

export default class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: {},
      commentEdit: '',
      edit: false,
      toastMessage: '',
      toastType: 'success',
      toastVisible: false,
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);

    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    // this.handleClickReport = this.handleClickReport.bind(this);
    // this.loadData = this.loadData.bind(this);
  }

  async componentDidMount() {
    // console.log('component did mount called');
  }

  async handleClickDelete() {
    const { comment, PostloadData } = this.props;
    const vars = { id: comment.id };
    const query = `mutation commentDelete($id:Int!){
      commentDelete(id: $id)
    }`;
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      // PostloadData({ message: 'Comment deleted!' });
      PostloadData('Comment deleted!');
    }
  }

  handleCommentChange(event) {
    this.setState({ commentEdit: event.target.value });
  }


  handleClickEdit() {
    // console.log('edit button clicked');
    this.setState({ edit: true });
  }

  handleCancelEdit() {
    this.setState({ edit: false });
  }

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


  async handleSubmitEdit() {
    // console.log('handleSubmitEdit called');
    const { comment } = this.props;
    const { commentEdit } = this.state;
    const vars = { id: comment.id, changes: { content: commentEdit } };

    this.setState({ edit: false });
    const query = `mutation commentUpdate($id:Int!,$changes:CommentUpdateInputs!){
      commentUpdate(id: $id, changes:$changes) {
        id
        content
        createdAt
        author {
          firstname
          username
          lastname
          id
        }
        post {
          source
          description
          createdAt
          userId
        }
      }
    }`;
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      this.setState({ comment: data.commentUpdate, commentEdit: '' });
      this.showSuccess('Comment updated!');
    }
  }
  // handleClickReport() {

  // }

  // loadData() {
  //   console.log('loadData called');
  // }

  render() {
    const {
      toastMessage, toastType, toastVisible,
    } = this.state;
    let comment;
    // const userId = await service.authorize();
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
    const { comment: commentState, edit } = this.state;
    if (Object.keys(commentState).length === 0 && commentState.constructor === Object) {
      comment = this.props.comment;
    } else {
      comment = commentState;
    }
    let commentContent = '';
    if (!edit) {
      commentContent = (
        comment.content
      );
    } else if (edit) {
      commentContent = (
        <Row>
          <Col xs={10} md={11} className="align-comment">
            <Form name="commentEdit">
              <Form.Group>
                <Form.Control as="textarea" name="content" defaultValue={comment.content} onChange={this.handleCommentChange} />
              </Form.Group>
            </Form>
          </Col>

          <ButtonToolbar>
            <Button type="submit" variant="primary" onClick={this.handleSubmitEdit}>Submit</Button>
            <Button type="button" variant="link" onClick={this.handleCancelEdit}>Cancel</Button>
          </ButtonToolbar>
        </Row>
      );
    }
    let defaultContent;
    if (userId === comment.author.id) {
      defaultContent = (
        <>
          <Row>
            <Col xs={10} md={11} className="align-comment">
              <div>
                <h6>
                  <LinkContainer to={`/profile/${comment.author.id}`}><a>{`${comment.author.username}`}</a></LinkContainer>
                  {' '}
                  {commentContent}
                </h6>
              </div>
            </Col>
            <Col xs={2} md={1}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <AiOutlineMore />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.handleClickEdit}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={this.handleClickDelete}>Delete</Dropdown.Item>
                  <Dropdown.Item>Report</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </>

      );
    //admin---------
    } else if (userId == 5) {
      defaultContent = (
        <>
          <Row>
            <Col xs={10} md={11} className="align-comment">
              <div>
                <h6>
                  <LinkContainer to={`/profile/${comment.author.id}`}><a>{`${comment.author.username}`}</a></LinkContainer>
                  {' '}
                  {commentContent}
                </h6>
              </div>
            </Col>
            <Col xs={2} md={1}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <AiOutlineMore />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.handleClickDelete}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </>

      );
    } else {
      defaultContent = (
        <>
          <Row>
            <Col xs={10} md={11} className="align-comment">
              <div>
                <h6>
                  <LinkContainer to={`/profile/${comment.author.id}`}><a>{`${comment.author.username}`}</a></LinkContainer>
                  {' '}
                  {commentContent}
                </h6>
              </div>
            </Col>
            <Col xs={2} md={1}>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <AiOutlineMore />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </>
      );
    }


    return (
      <div>
        { defaultContent }
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          variant={toastType}
        >
          {toastMessage}
        </Toast>
      </div>
    );
  }
}
