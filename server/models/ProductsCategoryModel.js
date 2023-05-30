const { db } = require('../db');

const create = (category_name) => {
  return db
    .query(
      'INSERT INTO products_categories (category_name) VALUES ($1) RETURNING *',
      [category_name]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM products_categories')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM products_categories WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (category_name, id) => {
  return db
    .query(
      'UPDATE products_categories SET category_name WHERE id = $2 RETURNING *',
      [category_name, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM products_categories WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };