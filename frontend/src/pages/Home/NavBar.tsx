import React, { useState } from 'react';
import classNames from 'classnames';
import { Transition } from '../../components/Transition';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative pt-6 pb-0">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
          <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="/">
                <h1 className="h-8 w-auto text-xlli text-blue-600 font-bold">Typus</h1>
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <a href="/" className="font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out">
              Dashboard
            </a>
            <a
              href="/"
              className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
            >
              Pricing
            </a>
            <a
              href="/"
              className="ml-10 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
            >
              Examples
            </a>
          </div>
          <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <span className="inline-flex rounded-md shadow">
              <Link
                to={'/login'}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-gray-50 active:text-blue-700 transition duration-150 ease-in-out"
              >
                Log in
              </Link>
            </span>
          </div>
        </nav>
      </div>

      <div className={classNames('absolute top-0 inset-x-0 p-2 md:hidden', { hidden: !open, block: open })}>
        <Transition
          show={open}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="rounded-lg bg-white shadow-xs overflow-hidden rounded-lg shadow-md transition transform origin-top-right">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <h1 className="h-8 w-auto text-xl text-blue-600 font-bold">typus</h1>
              </div>
              <div className="-mr-2">
                <button
                  data-todo-at-click="open = false"
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
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                Dashboard
              </a>
              <a
                href="/"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                Pricing
              </a>
              <a
                href="/"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                Examples
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
        </Transition>
      </div>
    </div>
  );
};
