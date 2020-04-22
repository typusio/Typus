import React from 'react';

export const SelectedDeleteBanner = ({ onClick, numSelected }: { onClick: () => void; numSelected: number }) => {
  return (
    <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 max-w-6xl">
        <div className="p-2 rounded-lg bg-red-700 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg">
                <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth={'2'}>
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="inline">
                  <span className="font-bold">{numSelected}</span> submission{numSelected !== 1 ? 's' : ''} selected
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <div className="rounded-md shadow-sm">
                <a
                  className="flex items-center justify-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-red-600 bg-white hover:text-red-500 focus:outline-none focus:shadow-outline transition ease-in-out duration-150 cursor-pointer"
                  onClick={() => onClick()}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
