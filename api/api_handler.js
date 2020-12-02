const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const about = require('./about.js');
const user = require('./user.js');
const post = require('./post.js');
const comment = require('./comment.js');

const GraphQLDate = require('./graphql_date.js');


const resolvers = {
  Query: {
    about: about.getMessage,
    user: user.get,
    userList: user.list,

    post: post.get,
    postList: post.list,

    comment: comment.get,
    commentList: comment.list,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    userCreate: user.create,
    userUpdate: user.update,
    userDelete: user.delete,

    postCreate: post.create,
    postUpdate: post.update,
    postDelete: post.delete,

    commentCreate: comment.create,
    commentUpdate: comment.update,
    commentDelete: comment.delete,
  },
  User: {
    posts(queryUser) {
      // Sequelize mixins based on association
      return queryUser.getPosts();
    },
  },
  Post: {
    author(queryPost) {
      return queryPost.getAuthor();
    },
    comments(queryPost) {
      return queryPost.getComments();
    },
  },
  Comment: {
    author(queryComment) {
      return queryComment.getAuthor();
    },
    post(queryComment) {
      return queryComment.getPost();
    },
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  server.applyMiddleware({ app, path: '/graphql' });
}

module.exports = { installHandler };
