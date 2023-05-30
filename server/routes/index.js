const express = require('express');

const IndexRoutes = require('./IndexRoutes');
const AuthRoutes = require('./AuthRoutes');
const ProductsRoutes = require('./ProductsRoutes');
const ProductsInventoryRoutes = require('./ProductsInventoryRoutes')

const router = express.Router();

// RENDERING ROUTES
router.use('/', IndexRoutes);

// AUTHENTICATION ROUTES
router.use('/api/auth', AuthRoutes);

// CRUD REST API PRODUCTS ROUTES
router.use('/api/products', ProductsRoutes);

// CRUD REST API PRODUCTS-INVENTORY ROUTES
router.use('./api/products_inventory', ProductsInventoryRoutes);

// Catch all route
router.use((req, res) => {
  res.status(404).send({ message: 'URL Not found' });
});

module.exports = router;