import React, { useState, useContext } from 'react';
import { API_URL } from '../../../../api/api';
import { FormContext } from '../../../../store/FormContext';

export const SetupForm = () => {
  const { form } = useContext(FormContext);

  return (
    <form method="POST" action={`${API_URL}/${form.id}`}>
      <div>
        <label className="block text-sm font-medium leading-5 text-gray-700">Name</label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            name="message"
          />
        </div>
      </div>

      <span className="inline-flex mt-3 rounded-md shadow-sm">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
        >
          Submit
        </button>
      </span>
    </form>
  );
};
