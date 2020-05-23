import React from 'react';

export const SearchResultsTitle = ({ search, onReset }: { search: string; onReset: () => void }) => {
  return (
    <div className="flex flex-col w-full mt-2">
      <span className="mx-auto text-center">Showing results for "{search}"</span>

      <span className="inline-flex mx-auto mt-2 rounded-md shadow-sm">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
        >
          Reset search
        </button>
      </span>
    </div>
  );
};
