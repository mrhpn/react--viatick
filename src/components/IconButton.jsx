import React from 'react';

function IconButton({ Icon, title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex self-end bg-white ml-4 shadow border rounded-lg p-2.5 focus:ring focus:ring-violet-300 hover:bg-slate-200"
      title={title}>
      <Icon size={20} />
    </button>
  );
}

export default IconButton;
