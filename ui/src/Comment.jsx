import React from 'react';
import {
  Card, Row, Col, Image,
  Button, Dropdown,
} from 'react-bootstrap';

import { AiOutlineMore } from 'react-icons/ai';
import graphQLFetch from './graphQLFetch.js';

export default class Comment extends React.Component {
  constructor() {
    super();
    this.state = {
      edit: false,
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickReport = this.handleClickReport.bind(this);
    this.loadData = this.loadData.bind(this);
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

  }

  handleClickReport() {

  }

  loadData() {

  }

  render() {
    const { comment } = this.props;
    const { edit } = this.state;
    if (!edit) {
      return (
        <Row>
          <Col className="align-comment">
            <h6>{`${comment.author.username}: ${comment.content}`}</h6>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <AiOutlineMore />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                <Dropdown.Item onClick={this.handleClickDelete}>Delete</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      );
    }
  }
}
