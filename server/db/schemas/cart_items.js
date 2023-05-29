module.exports = `

DROP TABLE IF EXISTS cart_items CASCADE;

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL, 
    deleted_at TIMESTAMP NOT NULL
  );

`