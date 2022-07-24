import React from 'react';

const Modal = ({
  isOpen,
  title,
  errorMessage,
  submitButtonDisabled,
  data,
  value,
  onChange,
  onClose,
  onSubmit,
}) => {
  return (
    <div className={`${isOpen ? '' : 'hidden'}`}>
      <div
        className="fixed right-0 left-0 top-0 bottom-0 z-50 mx-auto flex h-full items-center justify-center overflow-y-auto overflow-x-hidden shadow-2xl backdrop-blur-sm backdrop-contrast-50  md:inset-0
      ">
        <div className="relative p-4 w-full max-w-sm h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <form className="space-y-3" action="#">
                <div>
                  <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="group name"
                    required
                  />
                  <span className="text-xs text-red-500">{errorMessage}</span>
                </div>
                <button
                  onClick={onSubmit}
                  disabled={submitButtonDisabled}
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-300 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Create Group
                </button>
              </form>
              <div className="bg-gray-100 mt-5 px-3 py-2 rounded-lg">
                <h6>{`${data[1].length} ${data[0]}`}</h6>
                {data[1].map((d, index) => {
                  if (index + 1 === data[1]?.length)
                    return (
                      <span key={index} className="text-gray-600 italic">
                        {d.name}
                      </span>
                    );
                  else
                    return (
                      <span key={index} className="text-gray-600 italic">
                        {d.name},{' '}
                      </span>
                    );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
