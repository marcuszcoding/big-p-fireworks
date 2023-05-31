const { db } = require('../db');

const create = (category_id, inventory_id, product_name, price, description, video_url, image_url) => {
  return db
    .query(
      'INSERT INTO products (category_id, inventory_id, product_name, price, description, video_url, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [category_id, inventory_id, product_name, price, description, video_url, image_url ]
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

const update = (category_id, inventory_id, product_name, price, description, video_url, image_url, id) => {
  return db
    .query(
      'UPDATE products SET category_id = $1, inventory_id = $2, product_name = $3, price = $4, description = $5, video_url = $6 image_url = $7 WHERE id = $8 RETURNING *',
      [category_id, inventory_id, product_name, price, description, video_url, image_url, id]
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