module.exports = `

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES products_categories(id),
    product_name VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    video_url VARCHAR(100),
    image_url TEXT NOT NULL
  );
`