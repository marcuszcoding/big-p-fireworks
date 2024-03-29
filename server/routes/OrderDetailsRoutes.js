const express = require('express');

const { OrderDetailsController } = require('../controllers');

const router = express.Router();

// CRUD REST API FRUITS ROUTES
// CREATE - post
router.post('/', OrderDetailsController.create);

// READ - get
// Read All
router.get('/', OrderDetailsController.getAll);

// Read One
router.get('/:id', OrderDetailsController.getById);

// Read order details by order ID
router.get('/order-details/:orderId', OrderDetailsController.getByOrderId);


// UPDATE - put
router.put('/:id', OrderDetailsController.update);

// DELETE - delete
router.delete('/:id', OrderDetailsController.remove);

module.exports = router;