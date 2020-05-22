import React, { useContext } from 'react';

import { Confirmation } from '../../../../util/interfaces';
import { useFormik } from 'formik';

import * as yup from 'yup';
import classNames from 'classnames';
import { API_URL } from '../../../../util/api';
import { FormContext } from '../../../../store/FormContext';

export const ConfirmationForm = ({ confirmation, onDelete }: { confirmation: Confirmation; onDelete: () => void }) => {
  const { form } = useContext(FormContext);

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
      const res = await fetch(`${API_URL}/confirmation/${form.id}`, {
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
                <div className="flex w-full mt-1 rounded-md shadow-sm sm:w-2/5">
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
                    placeholder={'Typus Confirmation'}
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
                    placeholder={'noreply@typus.com'}
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
                <div className="flex mt-1 rounded-md shadow-sm">
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
        <div className="flex flex-row px-0 pt-5 mt-8 border-t border-gray-200 md:absolute md:top-0 md:right-1 md:pt-0 md:mt-0 md:border-none">
          <span className="inline-flex mr-2 rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
            >
              <svg className="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20">
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
              className="inline-flex items-center px-4 py-2 text-sm font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md hover:bg-red-400 focus:shadow-outline-red focus:border-red-600"
            >
              Delete
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};
