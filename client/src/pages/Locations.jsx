import React, { useEffect, useState } from 'react';
import '../styles/Locations.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationsPage = () => {
  const [centerPosition, setCenterPosition] = useState([30.339980, -98.039540]);
  const [zoomLevel, setZoomLevel] = useState(9);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const locations = [
    { id: 1, name: 'BigP Indoor Store: ', address: "10501 SH 71 Burnet, TX 78611", geocode: [30.514890, -98.315610] },
    { id: 2, name: 'The O.G Stand: ', address: "2093 Ranch Rd 1431 Kingsland, TX 78639", geocode: [30.661680, -98.446610] },
    { id: 3, name: 'Near Wakepoint LBJ Stand: ', address: "14609 RR 1431 Kingsland, TX 78639", geocode: [30.656840, -98.426240] },
    { id: 4, name: 'Spicewood Stand #1: ', address: "19305 Hwy, 71 West Spicewood, TX 78669", geocode: [30.339980, -98.039540] },
    { id: 5, name: 'Spicewood Stand #2: ', address: "10115 Hwy, 71 West Spicewood, TX 78669", geocode: [30.458576, -98.155568] },
    { id: 6, name: 'Hudson Bend Stand: ', address: "5001 Hudson Bend Road Austin, TX 78734", geocode: [30.412570, -97.926830] },
    { id: 7, name: 'Bushy Creek Stand: ', address: "15418 N. FM 620 Austin, TX 78717", geocode: [30.504310, -97.718170] },
    { id: 8, name: 'Shiner TX Stand: ', address: "Hwy. 90A West (Across from Family Dollar)", geocode: [29.438970, -97.180890] },
    { id: 9, name: 'Brady Stand: ', address: "1187 Hwy. 87 North Brady, TX 76825", geocode: [31.126500, -99.335050] }
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  const [showMap, setShowMap] = useState(true); // State to control map visibility

  useEffect(() => {
    // Check if the screen width is below the mobile breakpoint (e.g., 768px)
    const mobileBreakpoint = 768;
    setShowMap(window.innerWidth > mobileBreakpoint);

    // Add an event listener to handle changes in window size
    const handleResize = () => {
      setShowMap(window.innerWidth > mobileBreakpoint);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleClickMarker = (location) => {
    setCenterPosition(location.geocode);
    setZoomLevel(12);
    setSelectedLocation(location.id);
  };

  const handleClickLocationName = (location) => {
    setSelectedLocation(location.id);
  };

  const renderLocations = () => {
    return locations.map(location => (
      <div key={location.id} className="location-item">
        <span
          className="location-name"
          onClick={(e) => {
            // e.preventDefault();
            handleClickLocationName(location);
          }}
        >
          {location.name}
        </span>
        <span className="location-address">{location.address}</span>
      </div>
    ));
  };

  return (
    <div className="locations-page">
      <div className="locations-list">
        <h1>Locations</h1>
        {renderLocations()}
      </div>
      <div className="leaflet-container">
        <MapContainer center={centerPosition} zoom={zoomLevel}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {locations.map(location => (
            <Marker
              key={location.id}
              position={location.geocode}
              icon={customIcon}
              eventHandlers={{
                click: () => handleClickMarker(location),
              }}
              opacity={selectedLocation === location.id ? 1 : 0.5}
            >
              {selectedLocation === location.id && (
                <Popup data-id={location.id}>
                  <h3>{location.name}</h3>
                </Popup>
              )}
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationsPage;

