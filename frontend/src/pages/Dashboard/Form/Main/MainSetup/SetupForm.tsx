import React, { useState } from 'react';
import { API_URL } from '../../../../../util/api';

export const SetupForm = ({ formId }: { formId: string }) => {
  return (
    <form method="POST" action={`${API_URL}/${formId}`}>
      <div>
        <label className="block text-sm font-medium leading-5 text-gray-700">Name</label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            name="name"
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
          Message
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            name="message"
          />
        </div>
      </div>

      <span className="inline-flex rounded-md shadow-sm mt-3">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700 transition ease-in-out duration-150"
        >
          Submit
        </button>
      </span>
    </form>
  );
};
