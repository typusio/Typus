import React from 'react';

export const SubmissionNote = () => {
  return (
    <div className="ml-2 overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Note</h3>
        <p className="max-w-2xl mt-1 text-sm leading-5 text-gray-500">Visible to all collaborators. Automatically saved</p>
      </div>
      <div>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="flex max-w-lg rounded shadow-sm">
            <textarea
              id="about"
              rows={8}
              className="block w-full transition duration-150 ease-in-out border-t border-gray-200 rounded-t-none resize-none form-textarea sm:text-sm sm:leading-5"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};
