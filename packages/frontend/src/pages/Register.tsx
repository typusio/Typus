import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';

import * as yup from 'yup';
import classNames from 'classnames';
import { AuthContext } from '../store/AuthContext';
import { useRouter } from '../util/hooks';
import { API_URL } from '../api/api';
import { Link } from 'react-router-dom';

import Logo from '../assets/logo.svg';
import { useToasts } from '../store/ToastContext';

export const RegisterPage = () => {
  const { addToast } = useToasts();
  const authContext = useContext(AuthContext);

  const { push } = useRouter();

  const { values, handleChange, errors, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email cannot be empty'),
      password: yup.string().required('Password cannot be empty'),
      confirmPassword: yup
        .string()
        .required('Confirm password cannot be emtpy')
        .oneOf([yup.ref('password')], 'Passwords must match'),
    }),
    async onSubmit(values, { setErrors }) {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, password: values.password }),
        credentials: 'include',
      });

      if (res.status == 400) return setErrors({ email: 'This email is already in use' });

      authContext.loggedIn = true;
      authContext.user = await res.json();

      addToast('Successfully created your account!', { type: 'success' });
      return push('/dashboard');
    },
    validateOnChange: false,
  });

  return (
    <div className="flex flex-col justify-center py-12 mt-12 bg-gray-50 sm:px-6 lg:px-8">
      <img src={Logo} alt="" className="w-16 h-16 mx-auto mb-5 cursor-pointer" onClick={() => push('/')} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-extrabold leading-9 text-center text-gray-900">Create an account</h2>
        <p className="mt-2 text-sm leading-5 text-center text-gray-600 max-w">
          Already have your account?{' '}
          <Link to="/login" className="font-medium text-blue-600 transition duration-150 ease-in-out hover:text-blue-500 focus:outline-none focus:underline">
            Login
          </Link>
        </p>
      </div>

      <div className="mx-3 mt-8 sm:mx-auto sm:w-full sm:max-w-md sm:mx-0">
        <form className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
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

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  className={classNames(
                    'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5',
                    { 'shadow-outline-red border-red-300': errors.confirmPassword },
                  )}
                />
              </div>
              <p className="text-red-500 transition text-sm pt-0.5">{errors.confirmPassword}</p>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  onClick={e => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md disabled:opacity-50 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
                >
                  Register
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
