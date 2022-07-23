import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';

const customIcon = new Icon({
  iconUrl: '/camera.svg',
  iconSize: [23, 23],
});

const iconRed = new DivIcon({
  className: 'red-marker',
  iconSize: [23, 23],
});

const iconBlack = new DivIcon({
  className: 'black-marker',
  iconSize: [23, 23],
});

const iconPurple = new DivIcon({
  className: 'purple-marker',
  iconSize: [23, 23],
});

function Map({ pins }) {
  //let long, lang;

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
          <Marker
            key={pin.pinId}
            position={[pin.long, pin.lang]}
            icon={pin.isAlert ? iconRed : iconBlack}>
            <Popup>
              <div>
                <h2 className="font-bold h1">{pin.name}</h2>
                <span className="block italic text-xs text-gray-500">
                  Department: {pin.department.name}
                </span>
                <span className="block italic text-xs text-gray-500">
                  Group: {pin.group.name}
                </span>
                <span className="text-gray-700 mt-3 block">{pin.remarks}</span>
                <img
                  className="block mt-3 rounded"
                  src={pin.image}
                  alt={pin.name}
                />
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default Map;
