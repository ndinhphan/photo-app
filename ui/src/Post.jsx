import React from 'react';
import {
  Card, Row, Col, Image,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';
/**
 * type Post{
  _id: ID!
  id: Int!
  userid: Int!
  source: String!
  visibility: VisibilityType!
  date: GraphQLDate!
  description: String
}
 */
export default class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {},
      user: {},
      comments: [],
      showDescription: true,
    };
  }

  componentDidMount() {
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

    const vars = {};
    if (currentPost.userid) vars.id = currentPost.userid;
    if (currentPost.id) vars.postid = currentPost.id;
    const query = `
    query post($id: Int!, $postid: Int!){
      user(id: $id){
        firstname lastname username description source
      }
      commentList(postid: $postid){
        id userid username postid description date 
      }
    }`;
    const data = await graphQLFetch(query, vars);

    if (data) {
      this.setState({ user: data.user, comments: data.commentList });
    }
    if (currentPost) this.setState({ post: currentPost });
    if (showDescription === false) this.setState({ showDescription });
  }

  render() {
    const {
      post, showDescription, user, comments,
    } = this.state;
    // console.log(`${post.description} ${showDescription}`);
    const commentsList = comments.map(comment => (
      <span className="commentCard" key={comment.id}>
        <h6>{`${comment.username}: ${comment.description}`}</h6>
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
          <Card.Header>
            <Row>
              <Col xs={-1}><Image fluid="true" responsive="true" src={user.source} roundedCircle /></Col>
              <Col xs={0}>
                <h6>{`${user.username}`}</h6>
                <h6>{`${(new Date())} `}</h6>
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
