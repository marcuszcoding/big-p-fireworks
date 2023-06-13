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

    req.user = decoded;
    next();
  });
};

const jwtIsAdmin = (req, res, next) => {
  if(!req.user.admin_role) {
    return res.status(401).send({message: "You are not an admin"})
  }
  next();
}

module.exports = { validateJWT, jwtIsAdmin };