import React, { useState, useEffect, useContext } from 'react';
import { API_URL, DOCS_URL } from '../../../../api/api';
import { useFormik } from 'formik';
import { FormContext } from '../../../../store/FormContext';

export const SettingsGeneral = () => {
  const formContext = useContext(FormContext);

  const { setValues, values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      hiddenFields: '',
      mappedFields: '',
    },
    async onSubmit() {
      const data = await fetch(`${API_URL}/form/${formContext.form.id}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }).then(res => res.json());

      formContext.form = data;
    },
  });

  useEffect(() => {
    async function fetchForm() {
      setValues({ name: formContext.form.name, hiddenFields: formContext.form.hiddenFields, mappedFields: formContext.form.mappedFields });
    }

    fetchForm();
  }, []);

  return (
    <div className="mt-4">
      <div>
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
          <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">Name</label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-xs rounded-md shadow-sm">
              <input
                className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                value={values.name}
                name="name"
                onChange={handleChange}
              />
            </div>
          </div>

          <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
            Hidden fields
            <br />
            <a className="text-blue-600" href={`${DOCS_URL}/fields/hidden-fields`} target="_blank">
              Read More
            </a>{' '}
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg rounded-md shadow-sm">
              <input
                className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                name="hiddenFields"
                onChange={handleChange}
                value={values.hiddenFields}
                placeholder="mjk4w, jnuw, a67yw, 9rghw"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Seperated by commas</p>
          </div>

          <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
            Mapped fields
            <br />
            <a className="text-blue-600" href={`${DOCS_URL}/fields/mapped-fields`} target="_blank">
              Read More
            </a>
          </label>
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg rounded-md shadow-sm">
              <input
                className="block w-full transition duration-150 ease-in-out form-input sm:text-sm sm:leading-5"
                name="mappedFields"
                onChange={handleChange}
                value={values.mappedFields}
                placeholder="mjk4w:name, jnuw:message"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">Raw value and mapped value, seperated with a colon. Seperated by commas</p>
          </div>
        </div>

        <div className="pt-5 mt-8 border-t border-gray-200">
          <div className="flex justify-end">
            <span className="inline-flex ml-3 rounded-md shadow-sm">
              <button
                onClick={() => handleSubmit()}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
              >
                Save
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
