const { db } = require('../db');

const create = (order_id, product_id, quantity, price, tax, product_total_price, subtotal, grand_total) => {
  return db
    .query(
      'INSERT INTO order_details (order_id, product_id, quantity, price, tax, product_total_price, subtotal, grand_total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [order_id, product_id, quantity, price, tax, product_total_price, subtotal, grand_total]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM order_details')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM order_details WHERE id = $1;', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getByOrderId = order_id => {
  return db
    .query('SELECT order_details.*, products.product_name, products.image_url FROM order_details JOIN products ON order_details.product_id = products.id WHERE order_id = $1;', [order_id])
    .then(data => data.rows)
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
    .query('DELETE FROM order_details WHERE order_id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove, getByOrderId };