import React from 'react';

function FormInput({ Icon, value, placeholder, onChange }) {
  return (
    <div className="relative ml-2 inline-flex">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <Icon size={20} color="#808080" />
      </div>
      <input
        value={value}
        onChange={onChange}
        type="text"
        className="inline-flex shadow w-64 border-gray-200 text-gray-900 text-sm rounded-lg pl-10 p-2.5 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormInput;
