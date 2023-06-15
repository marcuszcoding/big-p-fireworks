module.exports = `

DROP TABLE IF EXISTS order_details CASCADE;

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10, 2),
    tax DECIMAL(10, 2),
    product_total_price DECIMAL(10, 2),
    subtotal DECIMAL(10, 2),
    grand_total DECIMAL(10, 2)

  );

`