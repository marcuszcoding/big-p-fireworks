import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditLocations.css'; // Make sure to adjust the CSS file path
import { useNavigate } from 'react-router-dom';

const EditLocations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [editedLocation, setEditedLocation] = useState({});
  const navigate = useNavigate();

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

  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {
      // Adjust this part based on your location data structure
      const data = {
        name: editedLocation.name,
        address: editedLocation.address,
        geocode: editedLocation.geocode,
        // Add more fields as needed
      };

      await axios.put(`/api/locations/${selectedLocation}`, data);

      console.log('Changes saved successfully');
      // Optionally, you may want to refetch locations or perform other actions
      navigate('/locations');
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
              value={editedLocation.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationAddress">Location Address:</label>
            <input
              type="text"
              id="locationAddress"
              value={editedLocation.address || ''}
              onChange={(e) => handleFieldChange('address', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationGeocode">Location Geocode:</label>
            <input
              type="text"
              id="locationGeocode"
              value={editedLocation.geocode || ''}
              onChange={(e) => handleFieldChange('geocode', e.target.value)}
            />
          </div>

          {/* Add more input fields for other location details as needed */}
          <button className="save-button" onClick={handleSaveChanges} disabled={!selectedLocation}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditLocations;
