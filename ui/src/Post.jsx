/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable max-len */
import React from 'react';
import {
  Card, Row, Col, Image,
  Button, Dropdown, Form, ButtonToolbar,
  Nav,
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

import {
  AiOutlineGlobal, AiOutlineHeart, AiOutlineMore, AiFillHeart,
} from 'react-icons/ai';

import Toast from './Toast.jsx';

import graphQLFetch from './graphQLFetch.js';
import Comment from './Comment.jsx';

function handleDateDifference(date) {
  if (date) {
    const currentDate = new Date();
    const differenceInSeconds = (currentDate.getTime() - date.getTime()) / 1000;
    const differenceInDays = Math.floor(differenceInSeconds / (60 * 60 * 24));
    const differenceInYears = Math.floor(differenceInDays / 365);
    if (differenceInYears > 1) return `${differenceInYears} years ago`;
    if (differenceInYears === 1) return 'a year ago';
    if (differenceInDays === 1) return 'a day ago';
    if (differenceInDays < 1) {
      const differenceInHours = Math.floor(differenceInSeconds / (60 * 60));
      if (differenceInHours > 1) return `${differenceInHours} hours ago`;
      if (differenceInHours === 1) return 'an hour ago';
      const differenceInMinutes = Math.floor(differenceInSeconds / (60));
      if (differenceInMinutes > 1) return `${differenceInMinutes} minutes ago`;
      return 'less than a minute ago';
    }
    return `${differenceInDays} days ago`;
  }
  return undefined;
}

export default class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {},
      comment: '',
      postEdit: '',
      edit: false,
      toastMessage: '',
      toastType: 'success',
      toastVisible: false,
      liked: false,
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.loadData = this.loadData.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handlePostEditChange = this.handlePostEditChange.bind(this);

    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);

    this.handleOnClickLike = this.handleOnClickLike.bind(this);
    this.handleOnClickUnlike = this.handleOnClickUnlike.bind(this);
  }

  async componentDidMount() {
    // console.log('component did mount called');
    this.loadData();
  }

  // componentDidUpdate(prevProps) {
  //   console.log('component post updated');
  //   const { post: prevPost } = prevProps;
  //   const { post } = this.state;
  //   console.log(post.comments);
  //   if (prevPost.source !== post.source || prevPost.description !== post.description || post.comments.length !== prevPost.comments.length) {
  //     this.loadData();
  //   }
  // }

  async loadData(message) {
    // console.log('loadData called');
    const { post: currentPost } = this.props;
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
    const query = `query post($id: Int!){
      post(id: $id) {
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
            id
          }
        }
        postlikes{
          userId
        }
      }
    }
    `;
    const vars = { id: currentPost.id };
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      // console.log('data fetched from loaddata');
      if (message) {
        this.setState({ toastVisible: false });
        this.showSuccess(message);
      }
      this.setState({ post: data.post });
      if (data.post.postlikes.some(e => e.userId === userId)) {
        this.setState({ liked: true });
      } else this.setState({ liked: false });
      // change this later
      // console.log(data);
    }
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

  handleCommentChange(event) {
    this.setState({ comment: event.target.value });
  }

  async handleClickEdit() {
    // console.log('handleclickEdit called');
    this.setState({ edit: true });
  }

  async handleCancelEdit() {
    // console.log('handleCancelEdit called');
    this.setState({ edit: false });
  }

  handlePostEditChange(event) {
    this.setState({ postEdit: event.target.value });
  }

  async handleSubmitEdit() {
    // console.log('handleSubmitEdit called');
    let post;
    const { post: postState, postEdit } = this.state;
    if (Object.keys(postState).length === 0 && postState.constructor === Object) {
      post = this.props.post;
    } else {
      post = postState;
    }
    const vars = { id: post.id, changes: { description: postEdit } };
    this.setState({ edit: false });
    const query = `mutation postUpdate($id: Int!, $changes: PostUpdateInputs!){
      postUpdate(id: $id, changes: $changes) {
        id
        source
        description
        visibility
        createdAt
        userId
        author {
          source
          firstname
          lastname
          username
          id
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
            id
          }
        }
      }
    }
    `;
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      this.setState({ post: data.postUpdate, postEdit: '' });
      this.showSuccess('Post updated!');
    }
  }

  async handleClickDelete() {
    const { HomepageloadData } = this.props;
    let post;
    const { post: postState } = this.state;
    if (Object.keys(postState).length === 0 && postState.constructor === Object) {
      post = this.props.post;
    } else {
      post = postState;
    }
    const vars = { id: post.id };
    const query = `mutation postDelete($id:Int!){
      postDelete(id: $id)
    }`;
    await graphQLFetch(query, vars, this.showError);
    HomepageloadData();
  }

  async handleSubmitComment() {
    // console.log('handleSubmitComment called');
    let post;
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
    const { post: postState, comment } = this.state;
    if (Object.keys(postState).length === 0 && postState.constructor === Object) {
      post = this.props.post;
    } else {
      post = postState;
    }
    // TODO: UserId, handleError
    const vars = { userId, postId: post.id, content: comment };
    // console.log(comment);
    // console.log(vars);
    const query = `mutation commentCreate($userId: Int!, $postId: Int!, $content: String!) {
      commentCreate(
        comment: { userId: $userId, postId: $postId, content: $content }
      ) {
        post {
          id
          source
          description
          visibility
          createdAt
          userId
          author {
            source
            firstname
            lastname
            username
            id
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
              id
            }
          }
        }
      }
    }
    `;
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      // console.log(data.commentCreate);
      this.setState({ post: data.commentCreate.post, comment: '' });
      // document.forms.commentCreate.content.value = '';
    }
  }

  async handleOnClickLike() {
    let post;
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);

    const { post: postState } = this.state;
    if (Object.keys(postState).length === 0 && postState.constructor === Object) {
      post = this.props.post;
    } else {
      post = postState;
    }
    // Change later
    const vars = { userId, postId: post.id };
    const query = `mutation postLikeCreate($userId: Int!, $postId: Int!){
      postLikeCreate(userId: $userId, postId: $postId){
        userId postId
      }
    }`;
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      // console.log(data.commentCreate);
      this.setState({ liked: true });
      // console.log('liked, state is ', this.state.liked);
      this.showSuccess('Post liked!');
      // document.forms.commentCreate.content.value = '';
    }
  }

  async handleOnClickUnlike() {
    let post;
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
    const { post: postState } = this.state;
    if (Object.keys(postState).length === 0 && postState.constructor === Object) {
      post = this.props.post;
    } else {
      post = postState;
    }
    // Change later
    const vars = { userId, postId: post.id };
    const query = `mutation postLikeDelete($userId: Int!, $postId: Int!){
      postLikeDelete(userId: $userId, postId: $postId)
    }`;
    const data = await graphQLFetch(query, vars, this.showError);
    if (data) {
      // console.log(data.commentCreate);
      this.setState({ liked: false });
      // console.log('unliked, state is ', this.state.liked);
      this.showSuccess('Post unliked!');
      // document.forms.commentCreate.content.value = '';
    }
  }

  render() {
    const userId = parseInt(localStorage.getItem('USER_ID'), 10);
    const {
      toastMessage, toastType, toastVisible,
    } = this.state;
    const { onProfile } = this.props;
    let post;
    const { post: postState, edit, comment } = this.state;
    if (Object.keys(postState).length === 0 && postState.constructor === Object) {
      post = this.props.post;
    } else {
      post = postState;
    }
    if (onProfile) {
      console.log('post is rendered in profile');
      return (
        <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
          <Card.Img fluid="true" responsive="true" src={post.source} />
        </Card>
      );
    }
    const commentsList = post.comments.map(com => (
      <Comment comment={com} key={com.id} PostloadData={this.loadData} />
    ));
    let description = '';
    if (!edit && post.description) {
      description = (
        <Card.Body>
          <Card.Title />
          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
      );
    } else if (edit) {
      description = (
        <Card.Body>
          <Form name="postEdit">
            <Form.Group>
              <Form.Control as="textarea" name="description" rows={3} defaultValue={post.description} onChange={this.handlePostEditChange} />
            </Form.Group>
          </Form>

          <ButtonToolbar>
            <Button type="submit" variant="primary" onClick={this.handleSubmitEdit}>Submit</Button>
            <Button type="button" variant="link" onClick={this.handleCancelEdit}>Cancel</Button>
          </ButtonToolbar>
        </Card.Body>
      );
    } else if (!post.description) {
      description = '';
    }

    let commentSection;
    if (commentsList.length >= 0) {
      commentSection = (
        <Card.Footer id="commentSection">
          {commentsList}
          <Row>
            <Col>
              <Form name="commentCreate">
                <Form.Group>
                  <Form.Control as="textarea" name="content" key={post.id} rows={2} onChange={this.handleCommentChange} value={comment} placeholder="Comment" />
                </Form.Group>
              </Form>
            </Col>
            <Col>
              <ButtonToolbar>
                <Button type="submit" variant="primary" onClick={this.handleSubmitComment}>Submit</Button>
              </ButtonToolbar>
            </Col>
          </Row>

        </Card.Footer>
      );
    }
    let postNavBar;
    const { liked } = this.state;
    if (!liked) {
      postNavBar = (
        <Nav className="ml-auto">
          <Button><h3><AiOutlineHeart onClick={this.handleOnClickLike} /></h3></Button>
          <Button><h3><AiOutlineGlobal /></h3></Button>
        </Nav>
      );
    } else {
      postNavBar = (
        <Nav className="ml-auto">
          <Button onClick={this.handleOnClickUnlike}><h3><AiFillHeart /></h3></Button>
          <Button><h3><AiOutlineGlobal /></h3></Button>
        </Nav>
      );
    }

    // console.log(post.author);
    // console.log(description);
    let PostEditAndDeleteButton;
    // console.log("userId:", userId);
    // console.log("post userID:", post.author.id);
    if (userId === post.author.id) {
      PostEditAndDeleteButton = (
        <div>
          <Dropdown.Item onClick={this.handleClickEdit}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={this.handleClickDelete}>Delete</Dropdown.Item>
        </div>
      );
    }

    const usernameLink = (
      <LinkContainer to={`/profile/${post.author.id}`}><a><h6 id="username">{`${post.author.username}`}</h6></a></LinkContainer>
    );

    return (
      <>
        <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
          <Card.Header className="PostHeader">
            <Row>
              <Col xs={2}><Image fluid="true" responsive="true" src={post.author.source} roundedCircle /></Col>
              <Col xs={10}>
                <Row>
                  <Col>
                    {usernameLink}
                    <h6>{`${handleDateDifference(post.createdAt)}`}</h6>
                  </Col>
                  <Col>
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        <AiOutlineMore />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {PostEditAndDeleteButton}
                        <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>

              </Col>
              <Col xs={6} />
            </Row>
          </Card.Header>
          <div>{description}</div>
          <Card.Img responsive="true" variant="top" fluid="true" src={post.source} />
          <div>{postNavBar}</div>
          <div>{commentSection}</div>
          <div>
            <Toast
              showing={toastVisible}
              onDismiss={this.dismissToast}
              variant={toastType}
            >
              {toastMessage}
            </Toast>
          </div>
        </Card>
        <br />
      </>
    );
  }
}
