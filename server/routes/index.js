// Manager of all routes 
// Add restrictions for admin 
const express = require('express');

const IndexRoutes = require('./IndexRoutes');
const AuthRoutes = require('./AuthRoutes');
const ProductsRoutes = require('./ProductsRoutes');
const ProductsInventoryRoutes = require('./ProductsInventoryRoutes');
const ProductsCategoryRoutes = require('./ProductsCategoryRoutes');
const OrdersRoutes = require('./OrdersRoutes');
const OrderDetailsRoutes = require('./OrderDetailsRoutes')
const DiscountsRoutes = require('./DiscountsRoutes')
const CartItemsRoutes = require('./CartItemsRoutes')

const router = express.Router();

// RENDERING ROUTES
router.use('/', IndexRoutes);

// AUTHENTICATION ROUTES
router.use('/api/auth', AuthRoutes);

// CRUD REST API PRODUCTS ROUTES
router.use('/api/products', ProductsRoutes);

// CRUD REST API PRODUCTS-INVENTORY ROUTES
router.use('./api/products_inventory', ProductsInventoryRoutes);

//CRUD REST API PRODUCTS-CATEGORY ROUTES
router.use('./api/products_category', ProductsCategoryRoutes);

//CRUD REST API ORDER ROUTES
router.use('./api/orders', OrdersRoutes);

//CRUD REST API ORDER-DETAILS ROUTES
router.use('./api/order_details', OrderDetailsRoutes);

//CRUD REST API DISCOUNTS ROUTES
router.use('./api/discounts', DiscountsRoutes);

//CRUD REST API CART ITEM ROUTES
router.use('./api/cart_items', CartItemsRoutes);


// Catch all route
router.use((req, res) => {
  res.status(404).send({ message: 'URL Not found' });
});

module.exports = router;