const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

// validate post input error
function validate(comment) {
  const errors = [];
  // change later
  if (comment.description < 0) {
    errors.push('Input is required');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s): ', { errors });
  }
}

async function get(_, { id }) {
  const db = getDb();
  const comment = await db.collection('comments').findOne({ id });
  return comment;
}
async function list(_, { userid, postid }) {
  const db = getDb();
  const filter = {};
  if (userid) filter.userid = userid;
  if (postid) filter.postid = postid;
  const comments = await db.collection('comments').find(filter).toArray();
  // reverse to show newer first
  return comments.reverse();
}
async function create(_, { comment }) {
  const db = getDb();
  validate(comment);
  const newComment = Object.assign({}, comment);
  newComment.id = await getNextSequence('comments');
  newComment.date = new Date();
  const result = await db.collection('comments').insertOne(newComment);
  const saved = await db.collection('comments').findOne({ _id: result.insertedId });
  return saved;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.description) {
    const comment = await db.collection('comments').findOne({ id });
    // console.log(comment);
    Object.assign(comment, changes);
    validate(comment);
  }
  await db.collection('comments').updateOne({ id }, { $set: changes });
  return db.collection('comments').findOne({ id });
}

// return boolean
async function remove(_, { id }) {
  const db = getDb();
  const comment = await db.collection('comments').findOne({ id });
  if (!comment) return false;
  const result = await db.collection('comments').removeOne({ id });
  // ???
  return result.deletedCount === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, update, delete: remove, list,
};
