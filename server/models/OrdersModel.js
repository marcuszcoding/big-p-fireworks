const { db } = require('../db');


const create = (user_id) => {
  return db
    .query(
      'INSERT INTO orders (user_id) VALUES ($1) RETURNING *;',
      [user_id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM orders;')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM orders WHERE id = $1;', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (order_status, id) => {
  return db
    .query(
      'UPDATE orders SET order_status = $1 WHERE id = 2$ RETURNING *;',
      [order_status, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM orders WHERE id = $1;', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };