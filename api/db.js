const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb://localhost/photoapp';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

// function to update manually generated id of users, posts and comments
async function getNextSequence(nameCounter) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: nameCounter },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}
function getDb() {
  return db;
}

module.exports = { getDb, connectToDb, getNextSequence };
