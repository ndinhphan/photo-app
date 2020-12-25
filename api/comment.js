const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db_mysql.js');

// validate post input error
function validate(comment) {
  const errors = [];
  // change later
  if (comment.content.length === 0) {
    errors.push('Comment cannot be empty');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function get(_, { id }) {
  const db = getDb();
  const Comment = await db.Comment.findByPk(id);
  return Comment;
}
async function list(_, { userId, postId }) {
  const db = getDb();
  let comments;
  // fix this
  if (userId && postId) comments = await db.Comment.findAll({ where: { userId, postId } });
  else if (userId) comments = await db.Comment.findAll({ where: { userId } });
  else if (postId) comments = await db.Comment.findAll({ where: { postId } });
  else comments = await db.Comment.findAll();
  // reverse to show newer first
  return comments;
}
async function create(_, { comment }) {
  const db = getDb();
  validate(comment);
  const newComment = Object.assign({}, comment);
  const result = await db.Comment.create(newComment);
  const savedComment = await db.Comment.findByPk(result.id);
  return savedComment;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes) {
    const comment = await db.Comment.findByPk(id);
    Object.assign(comment, changes);
    validate(comment);
    // console.log("Comment has been validated: ", comment );
  }
  await db.Comment.update(changes, { where: { id } });
  return db.Comment.findByPk(id);
}

// return boolean
async function remove(_, { id }) {
  const db = getDb();
  const comment = await db.Comment.findByPk(id);
  if (!comment) return false;
  const result = await db.Comment.destroy({ where: { id } });
  // ???
  return result === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, update, delete: remove, list,
};
