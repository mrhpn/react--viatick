import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import { DivIcon } from 'leaflet';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

function Map({ pins, filteredItems }) {
  const linePositions = filteredItems.map((item) => [item.long, item.lang]);

  function prepareMarker(isAlert, pinId) {
    let markerColor;
    let markerClass;

    if (isAlert) markerColor = 'red';
    else markerColor = 'black';

    markerClass = `${markerColor}-marker`;

    let filteredItem = filteredItems.find((item) => item.pinId === pinId);
    if (filteredItem) markerClass += ' filtered-marker';

    return new DivIcon({
      className: markerClass,
      iconSize: [23, 23],
      iconAnchor: [16, 24],
    });
  }

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
          <>
            <Marker
              key={pin.pinId}
              title={pin.name}
              alt={pin.name}
              position={[pin.long, pin.lang]}
              icon={prepareMarker(pin.isAlert, pin.pinId)}>
              <Popup>
                <div>
                  <h2 className="font-bold h1">{pin.name}</h2>
                  <span className="block italic text-xs text-gray-500">
                    Department: {pin.department.name}
                  </span>
                  <span className="block italic text-xs text-gray-500">
                    Group: {pin.group.name}
                  </span>
                  <span className="text-gray-700 mt-3 block">
                    {pin.remarks}
                  </span>
                  <img
                    className="block mt-3 rounded"
                    src={pin.image}
                    alt={pin.name}
                  />
                </div>
              </Popup>
            </Marker>
            <Polyline positions={[linePositions]} color="purple" />
          </>
        ))}
    </MapContainer>
  );
}

export default Map;
