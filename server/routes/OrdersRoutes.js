const  { validateJWT, jwtIsAdmin } = require('../middlewares') 
const express = require('express');

const { OrdersController } = require('../controllers');

const router = express.Router();


// ----------------------- ROUTES / ENDPOINTS
// router.get('/', IndexController.helloWorld);
router.post('/', validateJWT, OrdersController.create);

router.post('/:id/send', OrdersController.sendEmail)

// READ - get
// Read All
router.get('/', validateJWT, jwtIsAdmin, OrdersController.getAll);

// Read One
router.get('/:id', OrdersController.getById);

// UPDATE - put
router.put('/:id', validateJWT, jwtIsAdmin, OrdersController.update);

// DELETE - delete
router.delete('/:id', validateJWT, jwtIsAdmin, OrdersController.remove);


module.exports = router;