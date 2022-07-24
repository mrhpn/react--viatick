import './App.css';
import 'flowbite';
import React, { useState, useEffect } from 'react';
import { HiCamera, HiHand, HiSearchCircle, HiTrash } from 'react-icons/hi';

import DataItem from './components/DataItem';
import Map from './components/Map';
import MultiSourceSelect from './components/MultiSourceSelect';
import pinService from './services/pin';
import departmentService from './services/department';
import groupService from './services/group';
import IconButton from './components/IconButton';

function App() {
  const [pins, setPins] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const getPins = async () => {
    const { data } = await pinService.getAll();
    setPins(data.pins);
  };

  const getDepartments = async () => {
    const { data } = await departmentService.getAll();
    setDepartments(data.departments);
  };

  const getGroups = async () => {
    const { data } = await groupService.getAll();
    setGroups(data.groups);
  };

  useEffect(() => {
    getPins();
    getDepartments();
    getGroups();
  }, []);

  const handleFilter = (e) => {
    let filterValue = e.target.value; // D1 || G1
    setSelectedItem(filterValue);
    setFilteredItems(
      pins.filter(
        (pin) =>
          pin.department.name === filterValue || pin.group.name === filterValue
      )
    );
  };

  const handleClear = () => {
    setSelectedItem('');
    setFilteredItems([]);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="row-auto mb-3">
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
      <div className="flex my-3">
        <div className="relative ml-2 inline-flex">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <HiSearchCircle size={20} color="#808080" />
          </div>
          <input
            type="text"
            id="input-group-1"
            className="inline-flex shadow w-64 border-gray-200 text-gray-900 text-sm rounded-lg pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Search by name of camera..."
          />
        </div>

        <MultiSourceSelect
          data={[
            { label: 'Department', data: departments },
            { label: 'Groups', data: groups },
          ]}
          selectedItem={selectedItem}
          onSelect={(e) => handleFilter(e)}
        />

        {filteredItems.length > 0 && (
          <IconButton Icon={HiTrash} title="Clear" onClick={handleClear} />
        )}
      </div>
      <div
        id="map"
        className="row-auto m-2 border shadow-md rounded-lg leaflet-container">
        <Map pins={pins} filteredItems={filteredItems} />
      </div>
    </div>
  );
}

export default App;
