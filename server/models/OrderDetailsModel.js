const { db } = require('../db');

const create = (order_id, product_id, quantity, price) => {
  return db
    .query(
      'INSERT INTO orders_details (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [order_id, product_id, quantity, price]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM orders_details')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM orders_details WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (quantity, price, id) => {
  return db
    .query(
      'UPDATE order_details SET quantity = $1 price = $2 WHERE id = $3 RETURNING *',
      [quantity, price, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM orders_details WHERE order_id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };