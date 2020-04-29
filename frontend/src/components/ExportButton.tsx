import React, { useState, useRef } from 'react';
import { Transition } from './Transition';
import { useOutsideClick } from '../util/hooks';
import { API_URL } from '../util/api';

export const ExportButton = ({ formId }: { formId: string }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useOutsideClick(menuRef, () => setOpen(false));

  return (
    <span className="relative shadow-sm rounded-md">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray focus:border-gray-800 transition duration-150 ease-in-out"
      >
        <svg fill="currentColor" viewBox="0 0 20 20" className="-ml-1 mr-2 h-5 w-5">
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
            clipRule="evenodd"
          ></path>
        </svg>
        Export
      </button>

      <Transition
        show={open}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg z-50" ref={menuRef as any}>
          <div className="rounded-md bg-white shadow-xs">
            <div className="py-1">
              <a
                className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
                onClick={() => window.open(`${API_URL}/form/${formId}/data.json`)}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                  <path
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                As JSON
              </a>
              <a
                className="group flex items-center px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
                onClick={() => window.open(`${API_URL}/form/${formId}/data.csv`)}
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                As CSV
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </span>
  );
};
