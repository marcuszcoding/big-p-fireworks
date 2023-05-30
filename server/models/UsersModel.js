const { db } = require('../db');

const create = (email, password, phone_number) => {
  return db
    .query(
      'INSERT INTO users (email, password, phone_number) VALUES ($1, $2, $3) RETURNING *',
      [email, password, phone_number]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM users')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = (id) => {
  return db
    .query('SELECT * FROM users WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (id) => {
  return db
    .query(
      'UPDATE users SET email = $1 password = $2 phone_number = $3 WHERE id = $4 RETURNING *',
      [email, password, phone_number]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = (id) => {
  return db
    .query('DELETE FROM users WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };