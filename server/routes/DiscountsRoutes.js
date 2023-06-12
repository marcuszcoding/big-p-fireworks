const express = require('express');

const { DiscountsController } = require('../controllers');
const { validateJWT } = require('../middlewares')

const router = express.Router();


// ----------------------- ROUTES / ENDPOINTS
// router.get('/', IndexController.helloWorld);
router.post('/', DiscountsController.create);

// READ - get
// Read All
router.get('/', DiscountsController.getAll);

// Read One
router.get('/:id', DiscountsController.getById);

// UPDATE - put
router.put('/:id', DiscountsController.update);

// DELETE - delete
router.delete('/:id', DiscountsController.remove);


module.exports = router;