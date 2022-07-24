import React from 'react';

function IconButton({ Icon, title, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex align-middle self-end bg-white ml-4 shadow border rounded-lg p-2.5 focus:ring focus:ring-violet-300 hover:bg-slate-200"
      title={title}>
      <Icon size={20} />
      {text && <span className="text-sm ml-1">{text}</span>}
    </button>
  );
}

export default IconButton;
