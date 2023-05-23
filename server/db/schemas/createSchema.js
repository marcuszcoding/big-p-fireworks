module.exports = `

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS products_category CASCADE;
DROP TABLE IF EXISTS products_inventory CASCADE;
DROP TABLE IF EXISTS discounts CASCADE;
DROP TABLE IF EXISTS shopping_sessions CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;


  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL

  );

  CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES products_category(category_id),
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(200) NOT NULL
  );

  CREATE TABLE products_category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL

  );

  CREATE TABLE products_inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(product_id),
    quantity INTEGER NOT NULL

  );

  CREATE TABLE discounts (
    discount_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product(product_id),
    discount_percentage DECIMAL(5, 2),
    start_date DATE,
    end_date DATE

  );

  CREATE TABLE order_details (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    shipping_address TEXT

  );

  CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES order_details(order_id),
    product_id INTEGER REFERENCES product(product_id),
    quantity INTEGER,
    price DECIMAL(10, 2)

  );

  CREATE TABLE shopping_session (
    session_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(user_id),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP
  );

  CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES shopping_session(session_id),
    product_id INTEGER REFERENCES product(product_id),
    quantity INTEGER NOT NULL
  );

`