import React from 'react';
import Confirmed from '../../../../assets/confirmed.svg';

export const ValidationNotFound = ({ onClick }: { onClick: () => void }) => {
  return (
    <div>
      <img src={Confirmed} className="w-1/4 mx-auto mt-2 h-1/4"></img>
      <h2 className="mt-3 text-xl text-center">No validation has been setup for this form yet</h2>

      <div className="flex flex-row justify-around w-full mt-2 mb-4">
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
          >
            Set up validation
          </button>
        </span>
      </div>
    </div>
  );
};
