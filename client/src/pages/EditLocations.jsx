import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditLocations.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const EditLocations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [editedLocation, setEditedLocation] = useState({});
  const [newLocation, setNewLocation] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
  });
  const navigate = useNavigate();
  const { tokenRequest } = useAuth();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/api/locations');
        console.log('Locations:', response.data.locations);
        setLocations(response.data.locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      axios
        .get(`/api/locations/${selectedLocation}`)
        .then((response) => {
          setEditedLocation(response.data.location);
        })
        .catch((error) => {
          console.log('Failed to fetch selected location:', error);
        });
    } else {
      setEditedLocation({});
    }
  }, [selectedLocation]);

  const handleLocationChange = (locationId) => {
    setSelectedLocation(locationId);
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedLocation((prevLocation) => ({ ...prevLocation, [fieldName]: value }));
  };

  const handleNewLocationChange = (fieldName, value) => {
    setNewLocation((prevLocation) => ({ ...prevLocation, [fieldName]: value }));
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      const data = {
        name: editedLocation.name,
        address: editedLocation.address,
        latitude: editedLocation.latitude,
        longitude: editedLocation.longitude,
      };

      await tokenRequest('put', `/api/locations/${selectedLocation}`, data);

      console.log('Changes saved successfully');
      navigate('/locations');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddLocation = async (event) => {
    event.preventDefault();

    try {
      const data = {
        name: newLocation.name,
        address: newLocation.address,
        latitude: newLocation.latitude,
        longitude: newLocation.longitude,
      };

      await tokenRequest('post', '/api/locations', data);

      console.log('New location added successfully');
      navigate('/locations');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLocation = async () => {
    if (!window.confirm('Are you sure you want to delete this location?')) {
      return;
    }

    try {
      await tokenRequest('delete', `/api/locations/${selectedLocation}`);
      console.log('Location deleted successfully');
      navigate('/locations');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-locations-container">
      <div className="edit-locations-card">
        <h2 className="edit-locations-title">Edit Locations</h2>

        <div className="locations-dropdown">
          <label htmlFor="locationDropdown">Select a location:</label>
          <select
            id="locationDropdown"
            value={selectedLocation}
            onChange={(e) => handleLocationChange(e.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {selectedLocation && (
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="locationName">Location Name:</label>
              <input
                type="text"
                id="locationName"
                className="edit-location-input"
                value={editedLocation.name || ''}
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="locationAddress">Location Address:</label>
              <input
                type="text"
                id="locationAddress"
                className="edit-location-input"
                value={editedLocation.address || ''}
                onChange={(e) => handleFieldChange('address', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="locationLatitude">Location Latitude:</label>
              <input
                type="text"
                id="locationLatitude"
                className="edit-location-input"
                value={editedLocation.latitude || ''}
                onChange={(e) => handleFieldChange('latitude', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="locationLongitude">Location Longitude:</label>
              <input
                type="text"
                id="locationLongitude"
                className="edit-location-input"
                value={editedLocation.longitude || ''}
                onChange={(e) => handleFieldChange('longitude', e.target.value)}
              />
            </div>

            <button className="save-button" onClick={handleSaveChanges} disabled={!selectedLocation}>
              Save Changes
            </button>

            <button className="save-button delete-button" onClick={handleDeleteLocation}>
              Delete Location
            </button>
          </div>
        )}
      </div>

      <div className="add-location-card">
        <h2 className="add-location-title">Add New Location</h2>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="newLocationName">Location Name:</label>
            <input
              type="text"
              id="newLocationName"
              className="edit-location-input"
              value={newLocation.name}
              onChange={(e) => handleNewLocationChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newLocationAddress">Location Address:</label>
            <input
              type="text"
              id="newLocationAddress"
              className="edit-location-input"
              value={newLocation.address}
              onChange={(e) => handleNewLocationChange('address', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newLocationLatitude">Location Latitude:</label>
            <input
              type="text"
              id="newLocationLatitude"
              className="edit-location-input"
              value={newLocation.latitude}
              onChange={(e) => handleNewLocationChange('latitude', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newLocationLongitude">Location Longitude:</label>
            <input
              type="text"
              id="newLocationLongitude"
              className="edit-location-input"
              value={newLocation.longitude}
              onChange={(e) => handleNewLocationChange('longitude', e.target.value)}
            />
          </div>

          <button className="save-button" onClick={handleAddLocation}>
            Add Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLocations;

