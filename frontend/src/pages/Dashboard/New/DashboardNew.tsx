import React from 'react';
import BlankCanvas from '../../../assets/blank-canvas.svg';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import * as yup from 'yup';
import classNames from 'classnames';
import { useRouter } from '../../../util/hooks';
import { Form } from '../../../util/interfaces';
import { API_URL } from '../../../util/api';

export const DashboardNew = () => {
  const { push } = useRouter();

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required('Name cannot be empty')
        .min(2, 'Name must be more then 2 characters long')
        .max(50, 'Name must be less then 50 characters long'),
    }),
    async onSubmit() {
      const res = await fetch(`${API_URL}/form/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      if (res.status != 200) return; // handle error

      const data: Form = await res.json();

      return push(`/dashboard/form/${data.id}`);
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="flex sm:flex-row flex-col justify-between">
        <div className="md:w-1/4">
          <div className="text-2xl">Create a form</div>
          <div className="mt-3">
            <label className="block text-sm font-medium leading-5 text-gray-700">What should we call your form?</label>
            <div className="mt-1 relative rounded-md shadow-sm max-w-2xl">
              <input
                className={classNames('form-input block w-full sm:text-sm sm:leading-5', { 'shadow-outline-red border-red-300': errors.name })}
                placeholder="Charity volunteer applications"
                value={values.name}
                onChange={handleChange}
                name="name"
              />
            </div>
            <p className="text-red-500 transition text-sm pt-0.5">{errors.name}</p>
            <p className="mt-0.5 text-sm text-gray-500">You will be able to change this later</p>
          </div>
          <div className="mt-3">
            <span className="inline-flex rounded-md shadow-sm mt-2">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="inline-flex items-center px-12 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
              >
                Create form
              </button>
            </span>

            <span className="inline-flex rounded-md shadow-sm mt-2">
              <Link
                type="button"
                to={'/dashboard'}
                className="ml-2 inline-flex items-center px-5 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              >
                Cancel
              </Link>
            </span>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <img src={BlankCanvas} className="w-64 mt-8 text-center mx-auto sm:mx-0" />
        </div>
      </div>
    </div>
  );
};
