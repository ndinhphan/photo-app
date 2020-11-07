const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// parseLiteral parse string/inplace
// parseValue parse value of a variable
// graphql scalar type for storing dates
const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const value = new Date(ast.value);
      return Number.isNaN(value.getTime()) ? undefined : value;
    }
    return undefined;
  },
});
module.exports = GraphQLDate;
