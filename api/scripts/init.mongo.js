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
    description: 'first user',
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    description: 'second user',
  },
];

const postsDB = [
  {
    userid: 1,
    source: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    visibility: 'Public',
    description: 'first post',
  },
  {
    userid: 2,
    source: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    visibility: 'Public',
    description: 'second post',
  },
];
db.users.insertMany(usersDB);
db.posts.insertMany(postsDB);
const userCount = db.users.count();
const postCount = db.posts.count();

print('Inserted', userCount, 'users');
print('Inserted', postCount, 'posts');

db.counters.remove({ _id: 'users' });
db.counters.remove({ _id: 'posts' });
db.counters.insertMany([{ _id: 'users', current: userCount }, { _id: 'posts', current: postCount }]);
