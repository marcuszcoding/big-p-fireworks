const { db } = require('../db');

const create = (product_id, category_id, discount_percentage, discount_type, start_date, end_date ) => {
  return db
    .query(
      'INSERT INTO discounts (product_id, category_id, discount_percentage, discount_type, start_date, end_date )) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [product_id, category_id, discount_percentage, discount_type, start_date, end_date ]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAll = () => {
  return db
    .query('SELECT * FROM discounts')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getById = id => {
  return db
    .query('SELECT * FROM discounts WHERE id = $1', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const update = (product_id, category_id, discount_percentage, discount_type, start_date, end_date, id) => {
  return db
    .query(
      'UPDATE discounts SET product_id = $1 category_id = $2 discount_percentage = $3 discount_type =$4 start_date =$5 end_date = $6 WHERE id = $7 RETURNING *',
      [product_id, category_id, discount_percentage, discount_type, start_date, end_date, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const remove = id => {
  return db
    .query('DELETE FROM discounts WHERE id = $1', [id])
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

module.exports = { create, getAll, getById, update, remove };