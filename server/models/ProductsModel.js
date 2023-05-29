const { db } = require('../db');



const create = (category_id, inventory_id, product_name, price, description, video_url) => {
  return db
    .query(
      'INSERT INTO Products (category_id, inventory_id, product_name, price, description, video_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [category_id, inventory_id, product_name, price, description, video_url ]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM products')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM products WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (category_id, inventory_id, product_name, price, description, video_url) => {
  return db
    .query(
      'UPDATE products SET category_id = $1, inventory_id = $2, product_name = $3, price = $4, description = $5, video_url = $6  WHERE id = $7 RETURNING *',
      [category_id, inventory_id, product_name, price, description, video_url]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM products WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };