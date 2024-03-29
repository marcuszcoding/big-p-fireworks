const express = require('express');

const { AuthController } = require('../controllers');

const router = express.Router();

// AUTHENTICATION ROUTES
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/users/:id', AuthController.getUserById)

module.exports = router;