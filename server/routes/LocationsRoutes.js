const express = require('express');
const { LocationsController } = require('../controllers');
const { validateJWT, jwtIsAdmin } = require('../middlewares');

const router = express.Router();

// CREATE - post
router.post('/', validateJWT, jwtIsAdmin, LocationsController.createLocation);

// READ - get
// Read All
router.get('/', LocationsController.getAllLocations);

// Read One
router.get('/:id', LocationsController.getLocationById);

// UPDATE - put
router.put('/:id', validateJWT, jwtIsAdmin, LocationsController.updateLocation);

// DELETE - delete
router.delete('/:id', validateJWT, jwtIsAdmin, LocationsController.removeLocation);

module.exports = router;
