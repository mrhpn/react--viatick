import React from 'react';

function MultiSourceSelect({ data = [], selectedItem, onSelect }) {
  return (
    <select
      value={selectedItem}
      onChange={onSelect}
      className="inline-flex text-sm bg-white border shadow rounded-lg p-2.5 ml-4 focus:outline-none focus:bg-white">
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
