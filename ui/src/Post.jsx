import React from 'react';
import {
  Card, Row, Col, Image,
} from 'react-bootstrap';


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

  loadData() {
    const { post: currentPost, showDescription } = this.props;
    if (currentPost) this.setState({ post: currentPost });
    if (showDescription === false) this.setState({ showDescription });
  }

  render() {
    const { post, showDescription } = this.state;
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
              <Col xs={-1}><Image fluid responsive src="https://via.placeholder.com/50" exact to="/profile" roundedCircle /></Col>
              <Col xs={0}><h6>user</h6></Col>
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
