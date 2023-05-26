module.exports = `

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_categories CASCADE;
DROP TABLE IF EXISTS product_inventorys CASCADE;
DROP TABLE IF EXISTS discounts CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_details CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;


  CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL
  );

  CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES product_categories(category_id),
    inventory_id INTEGER REFERENCES product_inventorys(inventory_id)
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    video_url VARCHAR(100)
  );

  CREATE TABLE product_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
  );

  CREATE TABLE products_inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP NOT NULL,
  );

  CREATE TABLE discounts (
    discount_id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(product_id),
    category_id INTEGER REFERENCES product_categories(category_id)
    discount_percentage DECIMAL(5, 2),
    discount_type VARCHAR(55) NOT NULL
    start_date DATE,
    end_date DATE

  );

  CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "user"(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    shipping_address TEXT

  );

  CREATE TABLE order_details (
    order_details_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES order_details(order_id),
    product_id INTEGER REFERENCES product(product_id),
    quantity INTEGER,
    price DECIMAL(10, 2)

  );

  CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL
    created_at TIMESTAMP NOT NULL, 
    updated_at TIMESTAMP NOT NULL, 
    deleted_at TIMESTAMP NOT NULL
  );

`