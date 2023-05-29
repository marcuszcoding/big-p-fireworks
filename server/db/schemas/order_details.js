module.exports = `

DROP TABLE IF EXISTS order_details CASCADE;

CREATE TABLE order_details (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES order_details(order_id),
    product_id INTEGER REFERENCES product(product_id),
    quantity INTEGER,
    price DECIMAL(10, 2)

  );

`