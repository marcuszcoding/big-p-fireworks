// Database setup
const { Client } = require('pg');

const dbConfig = {
  user: process.env.development.PGUSER,
  host: process.env.development.PGHOST,
  database: process.env.development.PGDATABASE,
  password: process.env.development.PGPASSWORD,
  port: process.env.development.PGPORT
};

const db = new Client(dbConfig);

module.exports = { db };