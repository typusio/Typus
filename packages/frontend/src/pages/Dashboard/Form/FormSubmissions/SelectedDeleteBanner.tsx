import React from 'react';
import { Transition } from '../../../../components/Transition';

export const SelectedDeleteBanner = ({ onClick, numSelected, show }: { onClick: () => void; numSelected: number; show: boolean }) => {
  return (
    <Transition
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4"
      enterTo="opacity-100 translate-y-0 "
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-4"
      show={show}
    >
      <div className="fixed inset-x-0 bottom-0 z-50 pb-2 sm:pb-5">
        <div className="max-w-screen-xl px-2 mx-auto sm:px-6 lg:px-8">
          <div className="p-2 bg-red-600 rounded-lg shadow-lg sm:p-3">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center flex-1 w-0">
                <span className="flex p-2 rounded-lg">
                  <svg fill="currentColor" className="w-6 h-6 text-white" viewBox="0 0 20 20">
                    <path
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span>
                    <span className="font-bold">{numSelected}</span> submission{numSelected === 1 ? '' : 's'} selected
                  </span>
                </p>
              </div>
              <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto">
                <div className="rounded-md shadow-sm">
                  <a
                    onClick={onClick}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-red-600 transition duration-150 ease-in-out bg-white border border-transparent rounded-md cursor-pointer hover:text-red-500 focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
                <button
                  type="button"
                  className="flex p-2 -mr-1 transition duration-150 ease-in-out rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                  aria-label="Dismiss"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
