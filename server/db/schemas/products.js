module.exports = `

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES product_categories(category_id),
    inventory_id INTEGER REFERENCES product_inventorys(inventory_id)
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    video_url VARCHAR(100)
  );
  `