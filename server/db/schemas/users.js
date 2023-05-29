module.exports = `

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    admin_role BOOLEAN NOT NULL
  );

  `