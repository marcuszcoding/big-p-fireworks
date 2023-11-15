const { LocationsModel } = require('../models');

const createLocation = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send({ message: 'Provide name, address, latitude, and longitude' });
  }

  LocationsModel.createLocation(name, address, latitude, longitude)
    .then(location => {
      res.status(201).send({ message: 'Location created!', location });
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send({ message: 'Error creating location', error: error.message });
    });
};

const getAllLocations = (req, res) => {
  LocationsModel.getAllLocations()
    .then(locations => {
      if (locations.length === 0) {
        return res.status(200).send({ message: 'No locations found!' });
      }

      res.status(200).send({ message: 'List of all locations!', locations });
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send({ message: 'Error reading locations', error: error.message });
    });
};

const getLocationById = (req, res) => {
  const { id } = req.params;

  LocationsModel.getLocationById(id)
    .then(location => {
      if (!location) {
        return res.status(404).send({ message: 'Location not found!' });
      }

      res.status(200).send({ message: 'Here is the location!', location });
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send({ message: 'Error reading location', error: error.message });
    });
};

const updateLocation = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).send({ message: 'Provide name, address, latitude, and longitude' });
  }

  const { id } = req.params;

  LocationsModel.updateLocation(name, address, latitude, longitude, id)
    .then(location => {
      if (!location) {
        return res.status(404).send({ message: 'Location not found!' });
      }

      res.status(200).send({ message: 'Location updated!', location });
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send({ message: 'Error updating location', error: error.message });
    });
};

const removeLocation = (req, res) => {
  const { id } = req.params;

  LocationsModel.removeLocation(id)
    .then(location => {
      if (!location) {
        return res.status(404).send({ message: 'Location not found!' });
      }

      res.status(204).send();
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send({ message: 'Error deleting location', error: error.message });
    });
};

module.exports = { createLocation, getAllLocations, getLocationById, updateLocation, removeLocation };
