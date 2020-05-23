import React from 'react';
import BlankCanvas from '../../../assets/blank-canvas.svg';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import * as yup from 'yup';
import classNames from 'classnames';
import { useRouter } from '../../../util/hooks';
import { Form } from '../../../util/interfaces';
import { API_URL } from '../../../api/api';

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
    <div className="px-4 mx-auto mt-12 max-w-7xl sm:px-6 lg:px-8">
      <form className="flex flex-col justify-between sm:flex-row">
        <div className="md:w-1/4">
          <div className="text-2xl">Create a form</div>
          <div className="mt-3">
            <label className="block text-sm font-medium leading-5 text-gray-700">What should we call your form?</label>
            <div className="relative max-w-2xl mt-1 rounded-md shadow-sm">
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
            <span className="inline-flex mt-2 rounded-md shadow-sm">
              <button
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="inline-flex items-center px-12 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
              >
                Create form
              </button>
            </span>

            <span className="inline-flex mt-2 rounded-md shadow-sm">
              <Link
                type="button"
                to={'/dashboard'}
                className="inline-flex items-center px-5 py-2 ml-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
              >
                Cancel
              </Link>
            </span>
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <img src={BlankCanvas} className="w-64 mx-auto mt-8 text-center sm:mx-0" />
        </div>
      </form>
    </div>
  );
};
