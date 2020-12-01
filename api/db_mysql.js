const Sequelize = require('sequelize');
// const fs = require('fs');
// const path = require('path');
require('dotenv').config();

const db = {};

const userModel = require('./models/user');
const postModel = require('./models/post');
const commentModel = require('./models/comment');


async function connectToDb() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'mysql',
    },
  );
  await sequelize.authenticate();

  db.User = await userModel(sequelize, Sequelize);
  db.Post = await postModel(sequelize, Sequelize);
  db.Comment = await commentModel(sequelize, Sequelize);

  if (db.User.associate) {
    db.User.associate(db);
  }

  if (db.Post.associate) {
    db.Post.associate(db);
  }
  if (db.Comment.associate) {
    db.Comment.associate(db);
  }
  await sequelize.sync();

  db.sequelize = sequelize;

  console.log('connected to Mysql');
}

function getDb() {
  return db;
}

module.exports = { getDb, connectToDb };
