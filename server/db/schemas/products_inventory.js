module.exports = `

DROP TABLE IF EXISTS product_inventorys CASCADE;

CREATE TABLE products_inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NOT NULL,
  );

  `