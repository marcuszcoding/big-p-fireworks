const  { validateJWT, jwtIsAdmin } = require('../middlewares') 
const express = require('express');

const { ProductsController } = require('../controllers');

const router = express.Router();

// CRUD REST API FRUITS ROUTES
// CREATE - post
router.post('/', validateJWT, jwtIsAdmin, ProductsController.create);

// READ - get
// Read All
router.get('/', ProductsController.getAll);

// Read One
router.get('/:id', ProductsController.getById);

// UPDATE - put
router.put('/:id', validateJWT, jwtIsAdmin, ProductsController.update);

// DELETE - delete
router.delete('/:id', validateJWT, jwtIsAdmin, ProductsController.remove);

module.exports = router;