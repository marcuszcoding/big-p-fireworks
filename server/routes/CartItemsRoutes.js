const express = require('express');

const { CartItemsController } = require('../controllers');

const router = express.Router();

// CRUD REST API FRUITS ROUTES
// CREATE - post
router.post('/', CartItemsController.create);

// READ - get
// Read All
router.get('/', CartItemsController.getAll);

// Read One
router.get('/:id', CartItemsController.getById);

// UPDATE - put
router.put('/:id', CartItemsController.update);

// DELETE - delete
router.delete('/:id', CartItemsController.remove);

module.exports = router;