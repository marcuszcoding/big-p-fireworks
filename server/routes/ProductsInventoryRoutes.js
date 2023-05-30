const express = require('express');

const { ProductsInventoryController } = require('../controllers');

const router = express.Router();

// CRUD REST API FRUITS ROUTES
// CREATE - post
router.post('/', ProductsInventoryController.create);

// READ - get
// Read All
router.get('/', ProductsInventoryController.getAll);

// Read One
router.get('/:id', ProductsInventoryController.getById);

// UPDATE - put
router.put('/:id', ProductsInventoryController.update);

// DELETE - delete
router.delete('/:id', ProductsInventoryController.remove);

module.exports = router;