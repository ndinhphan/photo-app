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
    email: 'email1@address.com',
    password: '123456',
    description: 'first user',
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'email2@address.com',
    password: '123456',
    description: 'second user',
  },
];

const postsDB = [
  {
    id: 1,
    userid: 1,
    source: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    visibility: 'Public',
    date: new Date('2019-05-15'),
    description: 'first post',
  },
  {
    id: 2,
    userid: 2,
    source: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    visibility: 'Public',
    date: new Date('2020-01-20'),
    description: 'second post',
  },
  {
    id: 3,
    userid: 2,
    source: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    visibility: 'Public',
    date: new Date('2020-01-22'),
    description: 'look at my memes',
  },
  {
    id: 4,
    userid: 2,
    source: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    visibility: 'Public',
    date: new Date('2020-01-21'),
    description: 'Sadge',
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
