const Sequelize = require('sequelize');
// const fs = require('fs');
// const path = require('path');
require('dotenv').config();


const userModel = require('../models/user');
const postModel = require('../models/post');
const commentModel = require('../models/comment');
const postLikeModel = require('../models/postLike');
const reportModel = require('../models/report');

const db = {};
(async function init() {
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


  db.User = await userModel(sequelize, Sequelize);
  db.Post = await postModel(sequelize, Sequelize);
  db.Comment = await commentModel(sequelize, Sequelize);
  db.PostLike = await postLikeModel(sequelize, Sequelize);
  db.Report = await reportModel(sequelize, Sequelize);

  await sequelize.authenticate();
  await sequelize.drop();

  if (db.User.associate) {
    db.User.associate(db);
  }

  if (db.Post.associate) {
    db.Post.associate(db);
  }
  if (db.Comment.associate) {
    db.Comment.associate(db);
  }
  if (db.PostLike.associate) {
    db.PostLike.associate(db);
  }
  if (db.Report.associate) {
    db.Report.associate(db);
  }
  await sequelize.sync();

  console.log('Database initialized');
}());
