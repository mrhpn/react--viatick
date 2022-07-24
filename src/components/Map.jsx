import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  LayersControl,
} from 'react-leaflet';
import { DivIcon } from 'leaflet';

function Map({ pins, filteredItems, selectedItems, setSelectedItems }) {
  const linePositions = filteredItems.map((item) => [item.long, item.lang]);

  function prepareMarker(isAlert, pinId, isSelected = false) {
    let markerColor;
    let markerClass;

    if ((isAlert && isSelected) || isSelected) markerColor = 'purple';
    else if (isAlert) markerColor = 'red';
    else markerColor = 'black';

    markerClass = `${markerColor}-marker`;

    let filteredItem = filteredItems.find((item) => item.pinId === pinId);
    if (filteredItem) markerClass += ' filtered-marker';

    return new DivIcon({
      className: markerClass,
      iconSize: [23, 23],
      iconAnchor: [16, 24],
      popupAnchor: [0, -15],
    });
  }

  return (
    <MapContainer
      center={[1.3644, 103.75259]}
      zoom={16}
      scrollWheelZoom={false}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Basic Map">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topo Map">
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {pins?.length &&
        pins.map((pin) => (
          <div key={pin.pinId}>
            <Marker
              pinId={pin.pinId}
              title={pin.name}
              alt={pin.name}
              position={[pin.long, pin.lang]}
              icon={prepareMarker(
                pin.isAlert,
                pin.pinId,
                selectedItems.find((s) => s.pinId === pin.pinId)
              )}
              eventHandlers={{
                click: (e) => {
                  if (e.originalEvent.shiftKey) {
                    const pinId = e.target.options?.pinId;
                    const name = e.target.options?.title;
                    if (
                      e.sourceTarget.options.icon.options.className ===
                      'purple-marker'
                    ) {
                      let index = selectedItems.findIndex(
                        (i) => i.pinId === pinId
                      );
                      if (index > -1) {
                        selectedItems.splice(index, 1);
                        setSelectedItems([...selectedItems]);
                      }
                    } else
                      setSelectedItems([...selectedItems, { pinId, name }]);
                  }
                },
              }}>
              <Popup>
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
              </Popup>
            </Marker>
            <Polyline positions={[linePositions]} color="purple" />
          </div>
        ))}
    </MapContainer>
  );
}

export default Map;
