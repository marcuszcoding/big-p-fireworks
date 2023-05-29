module.exports = `

DROP TABLE IF EXISTS product_categories CASCADE;

CREATE TABLE product_categories (
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
  );
  
`