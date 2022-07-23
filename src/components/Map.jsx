import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

function Map({ pins }) {
  return (
    <MapContainer
      center={[1.3644, 103.75259]}
      zoom={16}
      scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.length &&
        pins.map((pin) => (
          <Marker key={pin.pinId} position={[pin.long, pin.lang]}>
            <Popup>{pin.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default Map;
