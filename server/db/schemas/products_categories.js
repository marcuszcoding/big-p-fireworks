module.exports = `

DROP TABLE IF EXISTS products_categories CASCADE;

CREATE TABLE products_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
  );
  
`


