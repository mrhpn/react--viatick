import React from 'react';

function FormInput({ Icon, value, placeholder, totalItemFound = 0, onChange }) {
  return (
    <>
      <div className="flex flex-col self-end">
        {value !== '' && totalItemFound > 0 ? (
          <span className="text-xs ml-2 text-green-500">
            {totalItemFound} match(es) found
          </span>
        ) : (
          value !== '' && (
            <span className="text-xs ml-2 text-gray-500">No match found</span>
          )
        )}
        <div className="relative inline-flex mt-1">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <Icon size={20} color="#808080" />
          </div>
          <input
            value={value}
            onChange={onChange}
            type="text"
            className="inline-flex shadow w-40 md:w-64 border-gray-200 text-gray-900 text-sm rounded-lg pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
}

export default FormInput;
