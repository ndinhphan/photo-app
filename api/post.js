const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

// validate post input error
function validate(post) {
  const errors = [];
  // change later
  if (post.source.length < 0) {
    errors.push('Source is required');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s): ', { errors });
  }
}

async function get(_, { id }) {
  const db = getDb();
  const post = await db.collection('posts').findOne({ id });
  return post;
}
async function list(_, { userid }) {
  const db = getDb();
  const filter = {};
  if (userid) filter.userid = userid;
  const posts = await db.collection('posts').find(filter).toArray();
  // console.log(posts);
  return posts;
}
async function create(_, { post }) {
  const db = getDb();
  validate(post);
  const newpost = Object.assign({}, post);
  newpost.id = await getNextSequence('posts');
  newpost.date = new Date();
  const result = await db.collection('posts').insertOne(newpost);
  const savedpost = await db.collection('posts').findOne({ _id: result.insertedId });
  return savedpost;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.source || changes.visibility || changes.description) {
    const post = await db.collection('posts').findOne({ id });
    Object.assign(post, changes);
    validate(post);
  }
  await db.collection('posts').updateOne({ id }, { $set: changes });
  return db.collection('posts').findOne({ id });
}

// return boolean
async function remove(_, { id }) {
  const db = getDb();
  const post = await db.collection('posts').findOne({ id });
  if (!post) return false;
  const result = await db.collection('posts').removeOne({ id });
  // ???
  return result.deletedCount === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, update, delete: remove, list,
};
