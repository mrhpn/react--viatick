import './App.css';
import { HiCamera, HiHand } from 'react-icons/hi';
import DataItem from './components/DataItem';

function App() {
  return (
    <div className="container mx-auto">
      <div className="row-auto">
        <DataItem Icon={HiCamera} name="Camera" count={11} />
        <DataItem Icon={HiHand} name="Active Alert" count={2} color="red" />
      </div>
    </div>
  );
}

export default App;
