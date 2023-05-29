require('dotenv').config();
const { db } = require('./index');

const usersSchema = require('./schemas/usersSchema');

const usersSeeds = require('./seeds/usersSeeds');

db.connect();

const promises = [
  db.query(usersSchema),
  db.query(usersSeeds),
];

Promise.all(promises)
  .then(() => console.log('DB reset completed!'))
  .then(() => db.end())
  .catch(err => console.log('Failed to reset', err));