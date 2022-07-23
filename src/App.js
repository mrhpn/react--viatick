import './App.css';
import { HiCamera, HiHand } from 'react-icons/hi';
import DataItem from './components/DataItem';
import Map from './components/Map';

function App() {
  return (
    <div className="container mx-auto mt-10">
      <div className="row-auto">
        <DataItem Icon={HiCamera} name="Camera" count={11} />
        <DataItem Icon={HiHand} name="Active Alert" count={2} color="red" />
      </div>
      <div
        id="map"
        className="row-auto m-2 border shadow-md rounded-lg leaflet-container">
        <Map />
      </div>
    </div>
  );
}

export default App;
