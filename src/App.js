import 'flowbite';
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  HiVideoCamera,
  HiHand,
  HiSearchCircle,
  HiTrash,
  HiFolderAdd,
  HiX,
} from 'react-icons/hi';

import DataItem from './components/DataItem';
import Map from './components/Map';
import MultiSourceSelect from './components/MultiSourceSelect';
import Button from './components/Button';
import FormInput from './components/FormInput';
import Modal from './components/Modal';
import pinService from './services/pin';
import departmentService from './services/department';
import groupService from './services/group';

function App() {
  const [pins, setPins] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [groups, setGroups] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupCreateButtonDisabled, setGroupCreateButtonDisabled] =
    useState(true);
  const [groupCreateErrorMsg, setGroupCreateErrorMsg] = useState('');

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
    setSelectedItems([]);
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
    setSelectedItems([]);
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

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      if ('' === groupName) {
        setGroupCreateErrorMsg('Enter group name');
        setGroupCreateButtonDisabled(true);
      } else {
        setGroupCreateButtonDisabled(false);

        const result = await groupService.create([groupName, selectedItems]);
        if (200 === result.status) {
          cleanUpCreateModalForm();
          setSelectedItems([]);
          setFilteredItem(groupName);
          showRecentlyCreatedGroup();
        }
      }
    } catch (error) {
      setGroupCreateErrorMsg(error.response.data.message);
    }
  };

  function cleanUpCreateModalForm() {
    setGroupName('');
    setGroupCreateButtonDisabled(true);
    setGroupCreateErrorMsg('');
    setCreateGroupModalVisible(false);
  }

  async function showRecentlyCreatedGroup() {
    const { data } = await pinService.getAll();
    const updatedFilteredPins = data.pins.filter(
      (pin) => pin.group.name === groupName
    );
    setFilteredItems(updatedFilteredPins);
  }

  const handleCreateGroupInputChange = (e) => {
    const value = e.target?.value;
    setGroupName(value);

    if ('' === value) {
      setGroupCreateErrorMsg('');
      setGroupCreateButtonDisabled(true);
    } else setGroupCreateButtonDisabled(false);
  };

  useEffect(() => {
    if ('' === searchValue) setFilteredItems([]);
  }, [searchValue]);

  useEffect(() => {
    getPins();
    getGroups();
  }, [filteredItem]);

  return (
    <div className="container mx-auto mt-10">
      <div className="row-auto mb-3">
        <DataItem Icon={HiVideoCamera} name="Camera" count={pins.length} />
        <DataItem
          Icon={HiHand}
          name="Active Alert"
          count={
            pins.length && pins.filter((pin) => pin.isAlert === true).length
          }
          color="#EF235C"
        />
      </div>
      <div className="flex flex-wrap justify-between my-3 mt-5">
        <div className="flex w-full md:w-auto">
          <FormInput
            Icon={HiSearchCircle}
            value={searchValue}
            placeholder="Search by name..."
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
            <div className="ml-4 self-end">
              <Button Icon={HiTrash} title="Clear" onClick={handleClear} />
            </div>
          )}
        </div>
        {selectedItems.length > 1 && (
          <div className="w-full mt-3 md:w-auto md:mt-0">
            <Button
              Icon={HiFolderAdd}
              title="Create Group"
              text="Create Group"
              onClick={() => setCreateGroupModalVisible(true)}
            />
            <div className="ml-4 inline">
              <Button
                Icon={HiX}
                title="Clear selections"
                onClick={() => setSelectedItems([])}
              />
            </div>
          </div>
        )}
      </div>
      <div
        id="map"
        className="relative row-auto mt-2 border border-gray-200 shadow-md rounded-lg leaflet-container">
        <Map
          pins={pins}
          filteredItems={filteredItems}
          selectedItems={selectedItems}
          setSelectedItems={(items) => setSelectedItems(items)}
        />
      </div>
      <div className="text-gray-400 text-sm italic mt-3">
        To multi-select markers, press `shift` and click on marker.
      </div>
      <Modal
        title="Create Group"
        value={groupName}
        data={['camera(s) selected', selectedItems]}
        isOpen={createGroupModalVisible}
        submitButtonDisabled={groupCreateButtonDisabled}
        errorMessage={groupCreateErrorMsg}
        onChange={(e) => handleCreateGroupInputChange(e)}
        onClose={() => setCreateGroupModalVisible(false)}
        onSubmit={(e) => handleCreateGroup(e)}
      />
    </div>
  );
}

export default App;
