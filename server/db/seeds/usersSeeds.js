module.exports = `
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('user1@email.com', 'abc123', 888-888-888, false);
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('user2@email.com', 'abc123', 999-888-888, true);
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('admin@email.com', '$2a$10$LdoR8TnVeNZr.R90pgHVR.y7Fn10CbHiATlH2kYCsXV3JnV5o29a6', 999-888-887, true);
`;