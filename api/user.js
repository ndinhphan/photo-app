const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

// validate user input error
function validate(user) {
  const errors = [];
  // change later
  if (user.firstname.length < 2 || user.lastname.length < 2) {
    errors.push('First name or Last name is too short');
  }
  if (user.email.length < 1) {
    errors.push('email is required');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s): ', { errors });
  }
}
async function get(_, { id }) {
  const db = getDb();
  const user = await db.collection('users').findOne({ id });
  return user;
}
async function list() {
  const db = getDb();
  const users = db.collection('users').find({}).toArray();
  return users;
}
async function create(_, { user }) {
  const db = getDb();
  validate(user);
  const newUser = Object.assign({}, user);
  newUser.id = await getNextSequence('users');
  const result = await db.collection('users').insertOne(newUser);
  const savedUser = await db.collection('users').findOne({ _id: result.insertedId });
  return savedUser;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.firstname || changes.lastname || changes.description) {
    const user = await db.collection('users').findOne({ id });
    Object.assign(user, changes);
    validate(user);
  }
  await db.collection('users').updateOne({ id }, { $set: changes });
  return db.collection('users').findOne({ id });
}

// return boolean
async function remove(_, { id }) {
  const db = getDb();
  const user = await db.collection('users').findOne({ id });
  if (!user) return false;
  const result = await db.collection('users').removeOne({ id });
  // ???
  return result.deletedCount === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, update, delete: remove, list,
};
