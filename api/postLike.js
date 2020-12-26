const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db_mysql.js');

// validate post input error

async function get(_, { id }) {
  const db = getDb();
  const postlike = await db.PostLike.findByPk(id);
  return postlike;
}
async function list(_, { userId, postId }) {
  const db = getDb();
  let likes;
  // fix this
  if (userId && postId) likes = await db.PostLike.findAll({ where: { userId, postId } });
  else if (userId) likes = await db.PostLike.findAll({ where: { userId } });
  else if (postId) likes = await db.PostLike.findAll({ where: { postId } });
  else likes = await db.PostLike.findAll();
  // reverse to show newer first
  return likes;
}
async function create(_, { postId, userId }) {
  // console.log('postlike create');
  const db = getDb();
  const newPostLike = { postId, userId };
  console.log(newPostLike);
  const ifsaved = await db.PostLike.findAll({ where: { userId, postId } });
  console.log(ifsaved);
  if (ifsaved.length >= 1) throw new UserInputError('Cannot like a post that user has already liked');
  const result = await db.PostLike.create(newPostLike);
  const savedPostLike = await db.PostLike.findByPk(result.id);
  return savedPostLike;
}

// return boolean
async function remove(_, { postId, userId }) {
  const db = getDb();
  const postlike = await db.PostLike.findOne({ where: { userId, postId } });
  if (!postlike) return false;
  const result = await db.PostLike.destroy({ where: { userId, postId } });
  // ???
  return result === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, delete: remove, list,
};
