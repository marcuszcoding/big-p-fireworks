const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { AuthModel } = require('../models');
const secretKey = process.env.SECRET_KEY;

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};

const register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: 'Provide email and password to register' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  AuthModel.register(email, hashedPassword)
    .then(user => {
      console.log(user)
      delete user.password
      res.status(201).send({ message: 'User registered successfully!', user});
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error creating user', error: error.message });
    });
};


const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Please provide an email and password' });
  }

  AuthModel.login(email)
    .then(user => {
      if (!user) {
        return res.status(401).send({ message: 'Invalid credentials!' });
      }

      const passwordsMatch = bcrypt.compareSync(password, user.password);
      if (!passwordsMatch) {
        return res.status(401).send({ message: 'Invalid Password!' });
      }

      delete user.password

      const token = generateToken(user);

      res.status(200).send({ message: 'User logged in successfully!', token });
    })
    .catch(error => {
      console.log(error.message);
      res
        .status(500)
        .send({ message: 'Error logging in user', error: error.message });
    });
};

const logout = (req, res) => {
  // Implement your logout logic here if needed
  res.status(200).send({ message: 'User successfully logged out' });
};

const getUserById = (req, res) => {
  AuthModel.getUserById(req.params.id)
  .then(user => {
    res.status(200).send({message: 'User id was found', user});
  })
};

module.exports = { register, login, logout, getUserById };