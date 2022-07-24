import React from 'react';

function MultiSourceSelect({
  data = [],
  selectedItem,
  totalItemFound = 0,
  onSelect,
}) {
  return (
    <>
      <div className="flex flex-col self-end">
        {selectedItem !== '' && totalItemFound > 0 ? (
          <span className="text-xs ml-4 text-green-500 mb-1">
            {totalItemFound} match(es) found
          </span>
        ) : (
          selectedItem !== '' && (
            <span className="text-xs ml-4 text-gray-500 mb-1">
              No match found
            </span>
          )
        )}
        <select
          value={selectedItem}
          onChange={onSelect}
          className="h-auto w-28 text-sm bg-white border border-gray-200 shadow rounded-lg p-2.5 pr-3 ml-4 focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-white">
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
      </div>
    </>
  );
}

export default MultiSourceSelect;
