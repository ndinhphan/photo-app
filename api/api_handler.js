const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');

const about = require('./about.js');
const user = require('./user.js');
const GraphQLDate = require('./graphql_date.js');


const resolvers = {
  Query: {
    about: about.getMessage,
    user: user.get,
    userList: user.list,
  },
  Mutation: {
    setAboutMessage: about.setAboutMessage,
    userCreate: user.create,
    userUpdate: user.update,
    userDelete: user.delete,
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
