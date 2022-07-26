import React from 'react';

function DataItem({ Icon, name, count, color = '#353333' }) {
  return (
    <div className="inline-flex items-center p-2 px-3 my-2 mr-4 border shadow-md rounded-lg bg-white">
      <Icon size={28} style={{ color }} />
      <div className="flex-col pl-3">
        <div className="font-bold" style={{ color }}>
          {count}
        </div>
        <span className="text-gray-400 text-sm">{name}</span>
      </div>
    </div>
  );
}

export default DataItem;
