const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db_mysql.js');
// const post = require('./post.js');

// validate user input error
function validate(user) {
  const errors = [];
  // change later
  if (user.firstname.length < 2 || user.lastname.length < 2) {
    errors.push('First name or Last name is too short');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s): ', { errors });
  }
}
async function get(_, { id }) {
  const db = await getDb();
  const User = await db.User.findByPk(id);
  // console.log(User);
  return User;
}
async function list() {
  const db = getDb();
  const users = db.User.findAll();
  return users;
}
async function create(_, { user }) {
  const db = getDb();
  validate(user);
  const newUser = Object.assign({}, user);
  if (!user.source) newUser.source = 'https://via.placeholder.com/50';
  // newUser.id = await getNextSequence('users');
  const result = await db.User.create(newUser);
  return result;
  // const savedUser = await db.collection('users').findOne({ _id: result.insertedId });
  // return savedUser;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.firstname || changes.lastname || changes.description) {
    const user = await db.User.findByPk(id);
    Object.assign(user, changes);
    validate(user);
  }
  await db.User.update(changes, { where: { id } });
  return db.User.findByPk(id);
}

// return boolean
async function remove(_, { id }) {
  const db = getDb();
  const user = await db.User.findByPk(id);
  if (!user) return false;

  const result = await db.User.destroy({ where: { id } });
  return result === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, update, delete: remove, list,
};
