import React from 'react';

import { Confirmation } from '../../../../../util/interfaces';
import { useFormik } from 'formik';

import * as yup from 'yup';
import classNames from 'classnames';
import { API_URL } from '../../../../../util/api';

export const ConfirmationForm = ({ confirmation, formId, onDelete }: { confirmation: Confirmation; formId: string; onDelete: () => void }) => {
  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      field: confirmation.field,
      subject: confirmation.subject,
      fromName: confirmation.fromName,
      fromAddress: confirmation.fromAddress,
      body: confirmation.body,
    },
    validationSchema: yup.object().shape({
      field: yup.string().required('Field cannot be empty'),
      subject: yup.string().required('Subject cannot be empty'),
      body: yup.string().required('Body cannot be empty'),
      fromName: yup.string().max(60, 'From name must be less then 60 characters long'),
      fromAddress: yup.string().email('From address must be a valid email'),
    }),
    async onSubmit() {
      const res = await fetch(`${API_URL}/confirmation/${formId}`, {
        credentials: 'include',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
    },
    validateOnChange: true,
  });

  return (
    <div>
      <form>
        <div>
          <div>
            <div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium leading-5 text-gray-700">Field</label>
                <div className="mt-1 flex rounded-md shadow-sm  sm:w-2/5 w-full">
                  <input
                    className={classNames('form-input w-full rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5', {
                      'shadow-outline-red border-red-300': errors.field,
                    })}
                    value={values.field}
                    name="field"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-500 transition text-sm pt-0.5">{errors.field}</p>
                <p className="mt-2 text-sm text-gray-500">The name of the field that will contain the user's email</p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="first_name" className="block text-sm font-medium leading-5 text-gray-700">
                  From name
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    className={classNames('form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5', {
                      'shadow-outline-red border-red-300': errors.fromName,
                    })}
                    placeholder={'Tumble Confirmation'}
                    name="fromName"
                    value={values.fromName}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-500 transition text-sm pt-0.5">{errors.fromName}</p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="last_name" className="block text-sm font-medium leading-5 text-gray-700">
                  From address
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    className={classNames('form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5', {
                      'shadow-outline-red border-red-300': errors.fromAddress,
                    })}
                    placeholder={'noreply@tumble.com'}
                    name="fromAddress"
                    value={values.fromAddress}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-500 transition text-sm pt-0.5">{errors.fromAddress}</p>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700">
                  Subject
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    className={classNames('flex-1 form-input w-2/3 rounded-none rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5', {
                      'shadow-outline-red border-red-300': errors.subject,
                    })}
                    value={values.subject}
                    name="subject"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-500 transition text-sm pt-0.5">{errors.subject}</p>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700">
                  Body
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <textarea
                    rows={3}
                    className={classNames('form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5', {
                      'shadow-outline-red border-red-300': errors.subject,
                    })}
                    value={values.body}
                    name="body"
                    onChange={handleChange}
                  />
                </div>
                <p className="text-red-500 transition text-sm pt-0.5">{errors.body}</p>
                <p className="mt-2 text-sm text-gray-500">Supports HTML</p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <span className="inline-flex rounded-md shadow-sm mr-2">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
              </svg>
              Save
            </button>
          </span>
          <span className="inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => onDelete()}
              className="mt-2 w-full inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 focus:outline-none focus:border-red-600 focus:shadow-outline-red active:bg-red-600 transition ease-in-out duration-150"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};
