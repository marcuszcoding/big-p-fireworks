const { db } = require('../db');

const create = (user_id, product_id, quantity) => {
  return db
    .query(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM cart_items')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM cart_items WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (product_id, quantity, id) => {
  return db
    .query(
      'UPDATE cart_items SET product_id = $1 quantity = $2  WHERE id = $3 RETURNING *',
      [product_id, quantity]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM carts_items WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};


module.exports = { create, getAll, getById, update, remove };