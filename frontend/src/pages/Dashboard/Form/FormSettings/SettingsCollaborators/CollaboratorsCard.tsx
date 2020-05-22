import React from 'react';
import { User } from '../../../../../util/interfaces';

export const CollaboratorsCard = ({ collaborator, onRemove }: { collaborator: User; onRemove: () => void }) => {
  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row mb-2">
        <div className="flex flex-row">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            viewBox="0 0 24 24"
            className="w-5 h-5 my-auto mr-1 text-blue-500"
          >
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span className="px-2 py-1 focus:outline-none">{collaborator.email}</span>
        </div>
        <span className="inline-flex my-auto ml-2 rounded-md shadow-sm">
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex text-red-600 items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
          >
            Remove
          </button>
        </span>
      </div>
    </div>
  );
};
