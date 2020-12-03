import React from 'react';
import {
  Card, Row, Col, Image,
  Button,
} from 'react-bootstrap';

import { AiFillDelete } from 'react-icons/ai';
import graphQLFetch from './graphQLFetch.js';

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
      showDescription: true,
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  componentDidMount() {
    console.log('component did mount called');
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { post: prevPost } = prevProps;
    const { post } = this.props;
    if (prevPost.source !== post.source) {
      this.loadData();
    }
  }

  async loadData() {
    const { post: currentPost, showDescription } = this.props;
    if (currentPost) this.setState({ post: currentPost });
    if (showDescription === false) this.setState({ showDescription });
  }

  async handleClickDelete() {
    const { post, HomepageloadData } = this.props;
    const vars = { id: post.id };
    const query = `mutation postDelete($id:Int!){
      postDelete(id: $id)
    }`;
    await graphQLFetch(query, vars);
    HomepageloadData();
  }

  render() {
    // const {
    //   post, showDescription,
    // } = this.state;
    const { post } = this.props;
    const showDescription = true;
    const commentsList = post.comments.map(comment => (
      <span className="commentCard" key={comment.id}>
        <h6>{`${comment.author.username}: ${comment.content}`}</h6>
      </span>
    ));
    let description = '';
    if (showDescription) {
      description = (
        <Card.Body>
          <Card.Title />
          <Card.Text>{post.description}</Card.Text>
        </Card.Body>
      );
    }

    // console.log(description);

    return (
      <>
        <Card border="secondary" style={{ width: 'auto', height: 'auto' }}>
          <Card.Header className="PostHeader">
            <Row>
              <Col xs={-1}><Image fluid="true" responsive="true" src={post.author.source} roundedCircle /></Col>
              <Col xs={0}>
                <Row>
                  <Col>
                    <h6>{`${post.author.username}`}</h6>
                    <h6>{`${handleDateDifference(post.createdAt)}`}</h6>
                  </Col>
                  <Col>
                    <Button><AiFillDelete onClick={this.handleClickDelete} /></Button>
                  </Col>
                </Row>

              </Col>
              <Col xs={6} />
            </Row>
          </Card.Header>
          <Card.Img responsive="true" variant="top" fluid="true" src={post.source} />
          <div>{description}</div>
          <Card.Footer>
            {commentsList}
          </Card.Footer>
        </Card>
        <br />
      </>
    );
  }
}
