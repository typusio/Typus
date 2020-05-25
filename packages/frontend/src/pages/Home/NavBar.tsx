import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { Transition } from '../../components/Transition';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.svg';
import { AuthContext } from '../../store/AuthContext';

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const authContext = useContext(AuthContext);

  return (
    <div className="relative pt-6 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
      <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <a href="/">
              <img className="h-8 w-auto sm:h-10" src={Logo} alt="" />
            </a>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                onClick={() => setOpen(true)}
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:block md:ml-10">
            <a href="/" className="font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
              Features
            </a>
            <a
              href="/"
              className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
            >
              Documentation
            </a>
            <a
              href="/"
              className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <span className="inline-flex rounded-md shadow-md">
            <span className="inline-flex rounded-md shadow-xs">
              {authContext.loggedIn && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-gray-100 bg-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Dashboard
                </Link>
              )}

              {!authContext.loggedIn && (
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                >
                  Log in
                </Link>
              )}
            </span>
          </span>
        </div>
      </nav>

      <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <Transition
          show={open}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="rounded-lg shadow-md">
            <div className="rounded-lg bg-white shadow-xs overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src={Logo} alt="" />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                    onClick={() => setOpen(false)}
                  >
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3">
                <a
                  href="/"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  Features
                </a>
                <a
                  href="/"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  Documentation
                </a>
                <a
                  href="/"
                  className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                >
                  GitHub
                </a>
              </div>
              <div>
                <a
                  href="/"
                  className="block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:bg-gray-100 focus:text-blue-700 transition duration-150 ease-in-out"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
