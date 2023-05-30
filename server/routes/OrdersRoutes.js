const express = require('express');

const { OrdersController } = require('../controllers');

const router = express.Router();


// ----------------------- ROUTES / ENDPOINTS
// router.get('/', IndexController.helloWorld);
router.post('/', OrdersController.create);

// READ - get
// Read All
router.get('/', OrdersController.getAll);

// Read One
router.get('/:id', OrdersController.getById);

// UPDATE - put
router.put('/:id', OrdersController.update);

// DELETE - delete
router.delete('/:id', OrdersController.remove);


module.exports = router;