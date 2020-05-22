import React from 'react';
import Team from '../../../../../assets/team.svg';

export const CollaboratorsNoneAdded = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="mt-2 mb-5">
      <img src={Team} className="w-1/4 mx-auto mt-2 h-1/4"></img>
      <h2 className="mt-3 text-xl text-center">No collaborators added</h2>

      <div className="flex flex-row justify-center mt-2">
        <span className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
          >
            Add your first collaborator
          </button>
        </span>
      </div>
    </div>
  );
};
