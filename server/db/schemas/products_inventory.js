module.exports = `

DROP TABLE IF EXISTS products_inventory CASCADE;

CREATE TABLE products_inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL
  );

  `