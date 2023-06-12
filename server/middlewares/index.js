const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
// JWT middleware
const validateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { validateJWT };