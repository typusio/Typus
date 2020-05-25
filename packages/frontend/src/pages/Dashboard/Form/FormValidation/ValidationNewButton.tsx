import React from 'react';

export const ValidationNewButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-green active:bg-blue-700"
      >
        <svg className="w-5 h-5 mr-3 -ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
        </svg>
        New Rule
      </button>
    </span>
  );
};
