module.exports = `

DROP TABLE IF EXISTS discounts CASCADE;

CREATE TABLE discounts (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    category_id INTEGER REFERENCES product_categories(category_id)
    discount_percentage DECIMAL(5, 2),
    discount_type VARCHAR(55) NOT NULL
    start_date DATE,
    end_date DATE
    );
  `
