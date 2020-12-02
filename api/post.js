const { UserInputError } = require('apollo-server-express');
const { getDb } = require('./db_mysql.js');
// validate post input error
function validate(post) {
  const errors = [];
  // change later
  if (post.source.length <= 0) {
    errors.push('Source is required');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function get(_, { id }) {
  const db = getDb();
  const Post = await db.Post.findByPk(id);
  return Post;
}
async function list(_, { userId, visibility }) {
  const db = getDb();
  // const filter = {};
  // if (userId) filter.userid = userId;
  // if (visibility) filter.visibility = visibility;
  // reverse to show new first
  let posts;
  // fix this
  if (userId && visibility) posts = await db.Post.findAll({ where: { userId, visibility } });
  else if (userId) posts = await db.Post.findAll({ where: { userId } });
  else if (visibility) posts = await db.Post.findAll({ where: { visibility } });
  else posts = await db.Post.findAll();
  // console.log(posts);
  return posts.reverse();
}
async function create(_, { post }) {
  const db = getDb();
  validate(post);
  const newpost = Object.assign({}, post);
  if (!newpost.visibility) newpost.visibility = 'Public';
  const result = await db.Post.create(newpost);
  const savedpost = await db.Post.findByPk(result.id);
  return savedpost;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.source || changes.visibility || changes.description) {
    const post = await db.Post.findByPk(id);
    Object.assign(post, changes);
    validate(post);
  }
  await db.Post.update(changes, { where: { id } });
  return db.Post.findByPk(id);
}

// return boolean
async function remove(_, { id }) {
  const db = getDb();
  const post = await db.Post.findByPk(id);
  if (!post) return false;

  const result = await db.Post.destroy({ where: { id } });

  return result === 1;
}

// delete: reverse keyword
module.exports = {
  create, get, update, delete: remove, list,
};
