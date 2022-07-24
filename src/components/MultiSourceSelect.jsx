import React from 'react';

function MultiSourceSelect({ data = [], selectedItem, onSelect }) {
  return (
    <select
      value={selectedItem}
      onChange={onSelect}
      className="w-20 text-sm bg-white border border-gray-200 shadow rounded-lg p-2.5 pr-3 ml-4 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-white">
      <option>Filter</option>
      {data.map((d) => {
        return (
          <optgroup key={d.label} label={d.label}>
            {d.data.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </optgroup>
        );
      })}
    </select>
  );
}

export default MultiSourceSelect;
