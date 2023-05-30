const { db } = require('../db');



const create = (id, product_id, quantity) => {
  return db
    .query(
      'INSERT INTO Products_inventory (id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [id, product_id, quantity ]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM products_inventory')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM products_inventory WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (id, product_id, quantity) => {
  return db
    .query(
      'UPDATE products_inventory SET id = $1, product_id = $2, quantity = $3, WHERE id = $4 RETURNING *',
      [id, product_id, quantity]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM products_inventory WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };