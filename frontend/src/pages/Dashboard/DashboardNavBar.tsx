import React, { useState, useRef, useContext } from 'react';
import { Transition } from '../../components/Transition';
import { Link } from 'react-router-dom';
import { useOutsideClick, useRouter } from '../../util/hooks';
import { API_URL, DOCS_URL } from '../../util/api';
import { AuthContext } from '../../store/AuthContext';

import Logo from '../../assets/logo.svg';

export const DashboardNavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { push } = useRouter();

  const authContext = useContext(AuthContext);

  const dropdownRef = useRef();
  useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const [open, setOpen] = useState(false);

  async function signout() {
    await fetch(`${API_URL}/auth/logout`, { credentials: 'include', method: 'POST' });

    authContext.loggedIn = false;
    authContext.user = null;

    return push('/');
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-gray-200 font-semibold text-lg">
                  <Link to={'/dashboard'}>
                    <img className="h-8 w-auto" src={Logo} alt="" />
                  </Link>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline">
                  <Link
                    className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none transition ease-in-out duration-150"
                    to={'/dashboard'}
                  >
                    Dashboard
                  </Link>

                  <a
                    href={DOCS_URL}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition ease-in-out duration-150"
                    target="_blank"
                  >
                    Documentation
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div data-todo-at-click-away="open = false" className="ml-3 relative" data-todo-x-data="{ open: false }">
                  <div>
                    <button
                      data-todo-at-click="open = !open"
                      className="max-w-xs flex items-center text-sm rounded-full text-white transition ease-in-out duration-150 text-gray-400 focus:outline-none"
                    >
                      <svg onClick={() => setDropdownOpen(!dropdownOpen)} fill="currentColor" viewBox="0 0 20 20" className="w-7 h-7">
                        <path
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <Transition
                    show={dropdownOpen}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg z-50">
                      <div className="py-1 rounded-md bg-white shadow-xs" ref={dropdownRef as any}>
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150 cursor-pointer">Settings</a>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150 cursor-pointer"
                          onClick={() => signout()}
                        >
                          Sign out
                        </a>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                data-todo-at-click="open = !open"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                onClick={() => setOpen(!open)}
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {!open && <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>}
                  {open && <path d="M6 18L18 6M6 6l12 12" strokeWidth="2"></path>}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="border-b border-gray-700">
          <div className="px-2 py-3 sm:px-3">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
            >
              Dashboard
            </Link>
            <a
              href={DOCS_URL}
              target="_blank"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
            >
              Documentation
            </a>
          </div>
          <div className="pt-2 pb-3 border-t border-gray-700">
            <div className="mt-1 px-2 sm:px-3">
              <a
                href="/"
                className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                Settings
              </a>
              <a
                onClick={() => signout()}
                className="cursor-pointer mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
