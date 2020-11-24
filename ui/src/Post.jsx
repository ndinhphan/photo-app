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
export default class Page extends React.Component {
  constructor() {
    super();
    this.state = {
      post: {},
      user: {},
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
    const query = `
    query user($id: Int!){
      user(id: $id){
        firstname lastname description source
      }
    }`;
    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({ user: data.user });
    }

    if (currentPost) this.setState({ post: currentPost });
    if (showDescription === false) this.setState({ showDescription });
  }

  render() {
    const { post, showDescription, user } = this.state;
    // console.log(`${post.description} ${showDescription}`);
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
              <Col xs={-1}><Image fluid responsive src={user.source} roundedCircle /></Col>
              <Col xs={0}>{`${user.firstname} ${user.lastname}`}</Col>
              <Col xs={6} />
            </Row>
          </Card.Header>
          <Card.Img responsive variant="top" fluid src={post.source} />
          <div>{description}</div>
        </Card>
        <br />
      </>
    );
  }
}
