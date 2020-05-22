import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../../../store/FormContext';
import { useRouter } from '../../../util/hooks';

export const SubmissionHeader = () => {
  const {
    push,
    match: { params },
  } = useRouter();

  const { currentSubmission, form } = useContext(FormContext);

  return (
    <header className="py-10 -my-64">
      {currentSubmission && (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex-1 min-w-0">
              <button className="text-sm cursor-pointer focus:underline focus:outline-none" onClick={() => push(`/dashboard/form/${form.id}`)}>
                ← Back to {form.name}
              </button>
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">Submission id #{currentSubmission.id}</h2>
              <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap">
                <div className="flex items-center mt-2 text-sm leading-5 text-gray-500 sm:mr-6">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  Created 8 minutes ago
                </div>
                <div
                  className="flex items-center mt-2 text-sm leading-5 text-gray-500 sm:mr-6"
                  aria-label="This is an encrypted, one-way hashed version of the user's IP address."
                  data-balloon-pos="down"
                >
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" fill-rule="evenodd"></path>
                  </svg>
                  {currentSubmission.ip.address}
                </div>
                {currentSubmission.spam && (
                  <div className="flex items-center mt-2 text-sm font-semibold leading-5 text-red-500 sm:mr-6">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                    Marked as spam
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-5 lg:mt-0 lg:ml-4">
              <span className="hidden rounded-md shadow-sm sm:block">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2 -ml-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
              </span>

              <span className="hidden ml-3 rounded-md shadow-sm sm:block">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2 -ml-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  Mark as spam
                </button>
              </span>

              <span className="rounded-md shadow-sm sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red focus:border-red-700 active:bg-red-700"
                >
                  <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                  Delete
                </button>
              </span>

              {/* Dropdown */}
              <span className="relative ml-3 rounded-md shadow-sm sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:shadow-outline focus:border-blue-300"
                  id="mobile-menu"
                  aria-haspopup="true"
                >
                  More
                  <svg className="w-5 h-5 ml-2 -mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <div className="absolute right-0 w-48 mt-2 -mr-1 origin-top-right rounded-md shadow-lg" aria-labelledby="mobile-menu" role="menu">
                  <div className="py-1 bg-white rounded-md shadow-xs">
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                    >
                      Edit
                    </a>
                    <a
                      href="/"
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                      role="menuitem"
                    >
                      View
                    </a>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
