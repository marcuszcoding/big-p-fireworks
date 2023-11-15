const { db } = require('../db');

const createLocation = (name, address, latitude, longitude) => {
  return db
    .query(
      'INSERT INTO locations (name, address, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, address, latitude, longitude]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const getAllLocations = () => {
  return db
    .query('SELECT * FROM locations')
    .then(data => data.rows)
    .catch(err => console.error(err.stack));
};

const getLocationById = id => {
  return db
    .query('SELECT * FROM locations WHERE id = $1;', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const updateLocation = (name, address, latitude, longitude, id) => {
  return db
    .query(
      'UPDATE locations SET name = $1, address = $2, latitude = $3, longitude = $4 WHERE id = $5 RETURNING *',
      [name, address, latitude, longitude, id]
    )
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

const removeLocation = id => {
  return db
    .query('DELETE FROM locations WHERE id = $1 RETURNING *', [id])
    .then(data => data.rows[0])
    .catch(err => console.error(err.stack));
};

module.exports = { createLocation, getAllLocations, getLocationById, updateLocation, removeLocation };

