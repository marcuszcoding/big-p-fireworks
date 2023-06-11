import React, {useState} from 'react';
import '../styles/Locations.css'
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet" //useMap 
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

const LocationsPage = () => {
  // const map = useMap()
  const [centerPosition, setCenterPosition] = useState([30.339980, -98.039540])
  const [zoomLevel, setZoomLevel] = useState(9)
  // Sample data for locations
  const locations = [
    { id: 1, name: 'BigP Indoor Store: ', address: "10501 SH 71 Burnet, TX 78611"},
    { id: 2, name: 'The O.G Stand: ', address: "2093 Ranch Rd 1431 Kingsland, TX 78639"},
    { id: 3, name: 'Near Wakepoint LBJ Stand: ', address: "14609 RR 1431 Kingsland, TX 78639"},
    { id: 4, name: 'Spicewood Stand #1: ', address: "19305 Hwy, 71 West Spicewood, TX 78669"},
    { id: 5, name: 'Spicewood Stand #2: ', address: "10115 Hwy, 71 West Spicewood, TX 78669"},
    { id: 6, name: 'Hudson Bend Stand: ', address: "5001 Hudson Bend Road Austin, TX 78734"},
    { id: 7, name: 'Bushy Creek Stand: ', address: "15418 N. FM 620 Austin, TX 78717"},
    { id: 8, name: 'Shiner TX Stand: ', address: "Hwy. 90A West (Across from Family Dollar)"},
    { id: 9, name: 'Brady Stand: ', address: "1187 Hwy. 87 North Brady, TX 76825"},
    // Add more locations as needed
  ];

  const markers = [
    {
      number: 1,
      geocode: [30.514890, -98.315610],
      popUp: "BigP Indoor Store"
    },
    {
      number: 2,
      geocode: [30.661680, -98.446610],
      popUp: "The O.G Stand"
    },
    {
      number: 3,
      geocode: [30.656840, -98.426240],
      popUp: "Near Wakepoint LBJ Stand"
    },
    {
      number: 4,
      geocode: [30.339980, -98.039540],
      popUp: "Spicewood Stand #1"
    },
    {
      number: 5,
      geocode: [30.458576, -98.155568],
      popUp: "Spicewood Stand #2"
    },
    {
      number: 6,
      geocode: [30.412570, -97.926830],
      popUp: "Hudson Bend Stand"
    },
    {
      number: 7,
      geocode: [30.504310, -97.718170],
      popUp: "Bushy Creek Stand"
    },
    {
      number: 8,
      geocode: [29.438970, -97.180890],
      popUp: "Shiner TX Stand, Across From Dollar Family"
    },
    {
      number: 9,
      geocode: [31.126500, -99.335050],
      popUp: "Brady Stand"
    },

  ]

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38], // size of icon
  })

  const handleClickMarker = (marker) => {
    setCenterPosition(marker.geocode);
    setZoomLevel(12);
  }

  // Render the list of locations
  const renderLocations = () => {
    return locations.map(location => (
      <div key={location.id} className="location-item">
        <span className="location-name">{location.name}</span>
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
          {markers.map(marker => 
            <Marker key={marker.geocode.toString()} position={marker.geocode} icon={customIcon}  eventHandlers={{
              click: () => handleClickMarker(marker)
            }}>
              <Popup>
                <h3>{marker.popUp}</h3>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};


export default LocationsPage;