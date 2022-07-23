import './App.css';
import React, { useState, useEffect } from 'react';
import { HiCamera, HiHand } from 'react-icons/hi';

import DataItem from './components/DataItem';
import Map from './components/Map';
import pinService from './services/pin';

function App() {
  const [pins, setPins] = useState([]);

  const getPins = async () => {
    const { data } = await pinService.getAll();
    setPins(data.pins);
  };

  useEffect(() => {
    getPins();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <div className="row-auto">
        <DataItem Icon={HiCamera} name="Camera" count={pins.length} />
        <DataItem
          Icon={HiHand}
          name="Active Alert"
          count={
            pins.length && pins.filter((pin) => pin.isAlert === true).length
          }
          color="red"
        />
      </div>
      <div
        id="map"
        className="row-auto m-2 border shadow-md rounded-lg leaflet-container">
        <Map pins={pins} />
      </div>
    </div>
  );
}

export default App;
