module.exports = `
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('user1@email.com', 'abc123', 888-888-888, false);
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('user2@email.com', 'abc123', 999-888-888, true);
  INSERT INTO users (email, password, phone_number, admin_role) VALUES ('admin@email.com', '$2a$12$c1S61rk2SE3jnGc5EDaPaeup7HceWjqlleFG.Q42CEFs4l3hvNTti', 999-888-887, true);
`;