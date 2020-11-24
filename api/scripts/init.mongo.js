/* eslint-disable no-restricted-globals */
/* global db */

// mongo photoapp scripts/init.mongo.js

db.users.remove({});
db.posts.remove({});

const usersDB = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    source: 'https://via.placeholder.com/50',
    description: 'first user',
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    source: 'https://via.placeholder.com/50',
    description: 'second user',
  },
];

const postsDB = [
  {
    id: 1,
    userid: 1,
    source: 'https://via.placeholder.com/650',
    visibility: 'Public',
    date: new Date('2019-05-15'),
    description: 'first post',
  },
  {
    id: 2,
    userid: 2,
    source: 'https://via.placeholder.com/650',
    visibility: 'Public',
    date: new Date('2020-01-20'),
    description: 'second post',
  },
  {
    id: 3,
    userid: 2,
    source: 'https://via.placeholder.com/650',
    visibility: 'Public',
    date: new Date('2020-01-22'),
    description: 'look at my memes',
  },
  {
    id: 4,
    userid: 2,
    source: 'https://via.placeholder.com/650',
    visibility: 'Public',
    date: new Date('2020-01-21'),
    description: 'Sadge',
  },
];

const commentsDB = [
  {
    id: 1,
    userid: 1,
    postid: 1,
    date: new Date('2020-01-21'),
    description: 'Wow nice post!!! haha!!',
  },
  {
    id: 2,
    userid: 2,
    postid: 1,
    date: new Date('2020-01-21'),
    description: 'Same',
  },
  {
    id: 3,
    userid: 2,
    postid: 1,
    date: new Date('2020-01-21'),
    description: 'No',
  },
  {
    id: 4,
    userid: 1,
    postid: 2,
    date: new Date('2020-01-11'),
    description: 'Nope',
  },
  {
    id: 5,
    userid: 2,
    postid: 2,
    date: new Date('2020-01-11'),
    description: 'Yes',
  },
  {
    id: 6,
    userid: 1,
    postid: 3,
    date: new Date('2020-01-11'),
    description: 'Yes',
  },
  {
    id: 7,
    userid: 2,
    postid: 4,
    date: new Date('2020-01-11'),
    description: 'Yes',
  },
];
db.users.insertMany(usersDB);
db.posts.insertMany(postsDB);
db.comments.insertMany(commentsDB);
const userCount = db.users.count();
const postCount = db.posts.count();
const commentCount = db.posts.count();

// eslint-disable-next-line no-undef
print('Inserted', userCount, 'users');
// eslint-disable-next-line no-undef
print('Inserted', postCount, 'posts');
// eslint-disable-next-line no-undef
print('Inserted', commentCount, 'comments');


db.counters.remove({ _id: 'users' });
db.counters.remove({ _id: 'posts' });
db.counters.remove({ _id: 'comments' });

db.counters.insertMany([{ _id: 'users', current: userCount }, { _id: 'posts', current: postCount }, { _id: 'comments', current: commentCount }]);
