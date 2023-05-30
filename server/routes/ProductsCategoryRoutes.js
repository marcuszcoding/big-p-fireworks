const express = require('express');

const { ProductsCategoryController } = require('../controllers');

const router = express.Router();


// ----------------------- ROUTES / ENDPOINTS
// router.get('/', IndexController.helloWorld);
router.post('/', ProductsCategoryController.create);

// READ - get
// Read All
router.get('/', ProductsCategoryController.getAll);

// Read One
router.get('/:id', ProductsCategoryController.getById);

// UPDATE - put
router.put('/:id', ProductsCategoryController.update);

// DELETE - delete
router.delete('/:id', ProductsCategoryController.remove);


module.exports = router;