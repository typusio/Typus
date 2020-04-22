import React, { useState, useRef, useContext } from 'react';
import { Transition } from '../../components/Transition';
import { Link } from 'react-router-dom';
import { useOutsideClick, useRouter } from '../../util/hooks';
import { API_URL } from '../../util/api';
import { AuthContext } from '../../store/AuthContext';

export const DashboardNavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { push } = useRouter();

  const authContext = useContext(AuthContext);

  const dropdownRef = useRef();
  // useOutsideClick(dropdownRef, () => setDropdownOpen(false));

  const [open, setOpen] = useState(false);

  async function signout() {
    await fetch(`${API_URL}/auth/logout`, { credentials: 'include', method: 'POST' });

    authContext.loggedIn = false;
    authContext.user = null;

    return push('/login');
  }

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-gray-200 font-semibold text-lg">
                  <Link to={'/dashboard'}>Tumble</Link>
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
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                      >
                        <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </button>
                  </div>
                  {dropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg">
                      <div className="py-1 rounded-md bg-white shadow-xs" ref={dropdownRef as any}>
                        <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150">
                          Settings
                        </a>
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150" onClick={() => signout()}>
                          Sign out
                        </a>
                      </div>
                    </div>
                  )}
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
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
            >
              Dashboard
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
