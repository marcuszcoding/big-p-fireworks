module.exports = `
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('user1@email.com', 'abc123', 888-888-888, false);
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('user2@email.com', 'abc123', 999-888-888, true);
`;