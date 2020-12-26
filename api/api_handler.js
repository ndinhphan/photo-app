const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const about = require('./about.js');
const user = require('./user.js');
const post = require('./post.js');
const comment = require('./comment.js');
const postLike = require('./postLike.js');

const GraphQLDate = require('./graphql_date.js');
const report = require('./report.js');


const resolvers = {
  Query: {
    about: about.getMessage,
    user: user.get,
    userList: user.list,

    post: post.get,
    postList: post.list,

    comment: comment.get,
    commentList: comment.list,

    postLikeList: postLike.list,

    report: report.get,
    reportList: report.list,
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

    postLikeCreate: postLike.create,
    postLikeDelete: postLike.delete,

    reportCreate: report.create,
    reportDelete: report.delete,
  },
  User: {
    posts(queryUser) {
      // Sequelize mixins based on association
      return queryUser.getPosts();
    },
    postlikes(queryUser) {
      return queryUser.getPostLikes();
    },
  },
  Post: {
    author(queryPost) {
      return queryPost.getAuthor();
    },
    comments(queryPost) {
      return queryPost.getComments();
    },
    postlikes(queryPost) {
      return queryPost.getPostLikes();
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
  PostLike: {
    post(queryPostLike) {
      return queryPostLike.getPost();
    },
  },
  Report: {
    user(queryReport) {
      return queryReport.getUser();
    },
    post(queryReport) {
      return queryReport.getPost();
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
