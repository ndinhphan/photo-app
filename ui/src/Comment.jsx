import React from 'react';
import {
  Row, Col, Dropdown, Form, Button, ButtonToolbar,
} from 'react-bootstrap';

import { AiOutlineMore } from 'react-icons/ai';
import graphQLFetch from './graphQLFetch.js';

export default class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      comment: {},
      edit: false,
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleCancelEdit = this.handleCancelEdit.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
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
    await graphQLFetch(query, vars);
    PostloadData();
  }

  handleClickEdit() {
    // console.log('edit button clicked');
    this.setState({ edit: true });
  }

  handleCancelEdit() {
    this.setState({ edit: false });
  }

  async handleSubmitEdit() {
    // console.log('handleSubmitEdit called');
    const { comment } = this.props;
    const vars = { id: comment.id, changes: { content: document.forms.commentEdit.content.value } };
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
        }
        post {
          source
          description
          createdAt
          userId
        }
      }
    }`;
    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({ comment: data.commentUpdate });
    }
  }
  // handleClickReport() {

  // }

  // loadData() {
  //   console.log('loadData called');
  // }

  render() {
    let comment;
    const { comment: commentState, edit } = this.state;
    if (Object.keys(commentState).length === 0 && commentState.constructor === Object) {
      comment = this.props.comment;
    } else {
      comment = commentState;
    }
    let commentContent = '';
    if (!edit) {
      commentContent = (
        <h6>{comment.content}</h6>
      );
    } else if (edit) {
      commentContent = (
        <Row>
          <Col xs={10} md={11} className="align-comment">
            <Form name="commentEdit">
              <Form.Group>
                <Form.Control as="textarea" name="content" defaultValue={comment.content} />
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

    const defaultContent = (
      <Row>
        <Col xs={10} md={11} className="align-comment">
          <h6>
            {`${comment.author.username}:`}
          </h6>
          {commentContent}
        </Col>
        <Col xs={2} md={1}>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <AiOutlineMore />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handleClickEdit}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={this.handleClickDelete}>Delete</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    );

    return (
      <div>
        { defaultContent }
      </div>
    );
  }
}
