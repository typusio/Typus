import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';

import * as yup from 'yup';
import classNames from 'classnames';
import { AuthContext } from '../store/AuthContext';
import { useRouter } from '../util/hooks';
import { API_URL } from '../util/api';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const { addToast } = useToasts();
  const authContext = useContext(AuthContext);

  const { push } = useRouter();

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email cannot be empty'),
      password: yup.string().required('Password cannot be empty'),
    }),
    async onSubmit() {
      const res = await fetch(`${API_URL}/auth/login`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        method: 'POST',
        credentials: 'include',
      });

      if (res.status == 400) return addToast('Invalid username/password combination', { appearance: 'error', autoDismiss: true });
      addToast('Successfully logged in. Redirecting...', { appearance: 'success', autoDismiss: true });
      authContext.loggedIn = true;

      push('/dashboard');
    },
    validateOnChange: false,
  });

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
            Register
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-3 sm:mx-0">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={classNames(
                    'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5',
                    { 'shadow-outline-red border-red-300': errors.email },
                  )}
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <p className="text-red-500 transition text-sm pt-0.5">{errors.email}</p>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  className={classNames(
                    'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5',
                    { 'shadow-outline-red border-red-300': errors.password },
                  )}
                />
              </div>
              <p className="text-red-500 transition text-sm pt-0.5">{errors.password}</p>
            </div>

            <div className="mt-6 flex items-center">
              <div className="text-sm leading-5 float-right">
                <a href="/" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  onClick={() => handleSubmit()}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
