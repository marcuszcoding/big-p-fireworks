const  { validateJWT } = require('../middlewares') 
const express = require('express');

const { ProductsController } = require('../controllers');

const router = express.Router();

// CRUD REST API FRUITS ROUTES
// CREATE - post
router.post('/', validateJWT, ProductsController.create);

// READ - get
// Read All
router.get('/', ProductsController.getAll);

// Read One
router.get('/:id', ProductsController.getById);

// UPDATE - put
router.put('/:id', ProductsController.update);

// DELETE - delete
router.delete('/:id', ProductsController.remove);

module.exports = router;