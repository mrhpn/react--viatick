import './App.css';
import 'flowbite';
import React, { useState, useEffect } from 'react';
import {
  HiCamera,
  HiHand,
  HiSearchCircle,
  HiTrash,
  HiPlusCircle,
} from 'react-icons/hi';

import DataItem from './components/DataItem';
import Map from './components/Map';
import MultiSourceSelect from './components/MultiSourceSelect';
import pinService from './services/pin';
import departmentService from './services/department';
import groupService from './services/group';
import Button from './components/Button';
import FormInput from './components/FormInput';

function App() {
  const [pins, setPins] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

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
    setFilteredItem(filterValue);
    setFilteredItems(
      pins.filter(
        (pin) =>
          pin.department.name === filterValue || pin.group.name === filterValue
      )
    );
  };

  const handleClear = () => {
    setFilteredItem('');
    setSearchValue('');
    setFilteredItems([]);
  };

  const handleSearch = (e) => {
    setFilteredItem('');

    const searchString = e.target?.value;
    if ('' === searchString) setFilteredItems([]);
    setSearchValue(searchString);

    setFilteredItems(
      pins.filter((pin) =>
        pin.name.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  };

  const handleMultiSelect = (_selectedItems) => {};

  useEffect(() => {
    if ('' === searchValue) setFilteredItems([]);
  }, [searchValue]);

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
      <div className="flex justify-between my-3 mt-5">
        <div className="flex">
          <FormInput
            Icon={HiSearchCircle}
            value={searchValue}
            placeholder="Search by name of camera..."
            totalItemFound={filteredItems?.length}
            onChange={handleSearch}
          />

          <MultiSourceSelect
            data={[
              { label: 'Department', data: departments },
              { label: 'Groups', data: groups },
            ]}
            selectedItem={filteredItem}
            totalItemFound={filteredItems?.length}
            onSelect={(e) => handleFilter(e)}
          />

          {filteredItems.length > 0 && (
            <Button Icon={HiTrash} title="Clear" onClick={handleClear} />
          )}
        </div>
        {selectedItems.length > 1 && (
          <Button
            Icon={HiPlusCircle}
            title="Create Group"
            text="Create Group"
            onClick={() => console.log('a')}
          />
        )}
      </div>
      <div
        id="map"
        className="row-auto mt-2 border border-gray-200 shadow-md rounded-lg leaflet-container">
        <Map
          pins={pins}
          filteredItems={filteredItems}
          selectedItems={selectedItems}
          setSelectedItems={(items) => setSelectedItems(items)}
        />
      </div>
    </div>
  );
}

export default App;
