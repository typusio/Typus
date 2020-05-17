import React, { useState, useEffect, useContext } from 'react';
import { Submission } from '../../../../util/interfaces';
import moment from 'moment';

import classNames from 'classnames';
import { SelectedDeleteBanner } from './SelectedDeleteBanner';
import { SubmissionPopup } from '../../../../components/SubmissionPopup';

import Void from '../../../../assets/void.svg';
import { API_URL } from '../../../../util/api';
import { useDebounce } from '../../../../util/hooks';

import FileSearching from '../../../../assets/file-searching.svg';
import { FormContext } from '../../../../store/FormContext';

export const MainSubmissions = () => {
  const { form } = useContext(FormContext);

  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const [shown, setShown] = useState<Submission[]>([]);
  const [paginatedRetults, setPaginatedResults] = useState<Submission[]>([]);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setIsSearching(true);
      setSearchLoading(true);
      return setShown([]);
    }

    setIsSearching(false);
    setShown(paginatedRetults);
    setSearchLoading(false);
  }, [searchQuery]);

  const debouncedSearch = useDebounce(searchQuery, 1000);

  useEffect(() => {
    async function search() {
      if (searchQuery) {
        const data = await fetch(`${API_URL}/${form.id}/search/${encodeURIComponent(searchQuery)}`, { credentials: 'include' }).then(res => res.json());

        setShown(data);
        setSearchLoading(false);
      }
    }

    search();
  }, [debouncedSearch]);

  const [popup, setPopup] = useState(0);

  async function fetchSubmissions(page: number = 0) {
    setLoading(true);
    const res = await fetch(`${API_URL}/${form.id}/submissions?perPage=${perPage}&page=${page}`, { credentials: 'include' });
    const data = await res.json();

    setShown(data.submissions);
    setPaginatedResults(data.submissions);
    setTotal(data.total);

    setPage(page);
    setLoading(false);
  }

  async function deleteSubmissions() {
    const res = await fetch(`${API_URL}/${form.id}/submissions`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissions: selected }),
      credentials: 'include',
    });

    setShown(shown.filter(s => !selected.includes(s.id)));
    setTotal(total - selected.length);
    setSelected([]);

    const maxPage = Math.ceil((total - selected.length) / perPage) - 1;

    if (isSearching && selected.length == shown.length) {
      setPaginatedResults(paginatedRetults.filter(s => !selected.includes(s.id)));
      setSearchQuery('');
    }

    if (page > maxPage) {
      if (page == 0) {
        setTotal(0);
        return setLoading(false);
      }

      setPage(maxPage);
      fetchSubmissions(maxPage);
    }
  }

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="-mt-4 sm:mt-0">
      <SubmissionPopup
        submissionId={popup}
        onClose={() => {
          setPopup(0);
        }}
        onRemove={() => {
          setShown(shown.filter(s => s.id !== popup));
          setTotal(total - 1);
          setPopup(0);
        }}
        open={popup !== 0}
      />
      <SelectedDeleteBanner
        numSelected={selected.length}
        onClick={() => {
          deleteSubmissions();
        }}
        show={selected.length !== 0}
      />

      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {!loading && total == 0 && !isSearching && (
        <div>
          <img src={Void} className="w-1/4 mx-auto mt-2 h-1/4"></img>
          <h2 className="mt-3 mb-5 text-xl text-center">No submissions yet</h2>
        </div>
      )}

      {total !== 0 && (
        <div>
          <div className="mb-3 sm:mb-0">
            <div className="flex rounded-md ">
              <input
                id="remember_me"
                type="checkbox"
                className="w-5 h-5 my-auto ml-1 mr-3 text-blue-600 transition duration-150 ease-in-out form-checkbox sm:ml-2"
                onChange={e => {
                  if (e.target.checked) {
                    return setSelected(shown.map(s => s.id));
                  }

                  setSelected([]);
                }}
              />
              <div className="relative flex flex-grow rounded-md shadow-sm focus-within:z-10">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  id="filter"
                  className="block w-full py-2 pl-10 pr-3 text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                  placeholder="Search submissions"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <ul>
            {!loading && searchLoading && (
              <div className="w-full">
                <div className="flex mt-8">
                  <span className="justify-center mx-auto text-xl text-center">Searching...</span>
                </div>

                <div className="flex flex-row justify-center">
                  <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                  </div>
                </div>
              </div>
            )}

            {isSearching && !searchLoading && shown.length !== 0 && (
              <div className="flex flex-col w-full mt-2">
                <span className="mx-auto text-center">Showing results for "{searchQuery}"</span>

                <span className="inline-flex mx-auto mt-2 rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50"
                  >
                    Reset search
                  </button>
                </span>
              </div>
            )}

            {isSearching && !searchLoading && shown.length == 0 && (
              <div className="mt-2">
                <img src={FileSearching} alt="" className="w-48 mx-auto" />
                <div className="flex flex-col mt-3">
                  <span className="text-xl text-center">No results found for "{searchQuery}".</span>
                  <span className="mt-1 text-center text-gray-500">Try searching something else?</span>
                </div>
              </div>
            )}

            {shown.map((sub, index) => (
              <li className="mt-2">
                <a
                  className={classNames('block hover:bg-gray-50 focus:outline-none transition duration-150 ease-in-out cursor-pointer', {
                    'bg-gray-100 hover:bg-gray-200': index % 2 !== 0,
                  })}
                  onClick={e => {
                    if ((e.target as any).value != undefined) return;

                    setPopup(sub.id);
                  }}
                >
                  <div className="relative flex items-center px-4 py-4 sm:px-6">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="absolute z-20 w-5 h-5 text-blue-600 transition duration-150 ease-in-out form-checkbox sm:left-2 left-1"
                      style={{ top: '40%' }}
                      checked={selected.includes(sub.id)}
                      onChange={e => {
                        if (!e.target.checked) {
                          return setSelected(selected.filter(s => s !== sub.id));
                        }

                        setSelected(arr => [...arr, sub.id]);
                      }}
                    />

                    <div className="flex items-center flex-1 min-w-0">
                      <div className="relative flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <table className="text-sm">
                            <tbody>
                              {Object.keys(JSON.parse(sub.data))
                                .splice(0, 4)
                                .map(key => (
                                  <tr>
                                    <td className="pr-5 text-gray-600">{key} </td>
                                    <td className="max-w-xs break-normal truncate">{JSON.parse(sub.data)[key]}</td>
                                  </tr>
                                ))}
                              {Object.keys(JSON.parse(sub.data)).length > 4 && <tr>...{Object.keys(JSON.parse(sub.data)).length - 4} more fields</tr>}
                            </tbody>
                          </table>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <div className="text-sm leading-5 text-gray-900">Created {moment(sub.createdAt).fromNow()}</div>
                            <div className="flex items-center mt-2 text-sm leading-5 text-gray-500">
                              Created from {sub.ip.address}
                              {sub.spam && (
                                <span className="text-red-500 ml-0.5 flex flex-row">
                                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 mt-0.5">
                                    <path
                                      fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    ></path>
                                  </svg>
                                  <span className="align-middle"> Marked as spam</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          {!isSearching && (
            <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="hidden sm:block">
                <p className="text-sm leading-5 text-gray-700">
                  Showing page <span className="font-medium">{page + 1}</span> of<span className="font-medium"> {Math.ceil(total / perPage)}</span>
                </p>
              </div>
              <div className="flex justify-between flex-1 sm:justify-end">
                {page !== 0 && (
                  <a
                    onClick={() => {
                      fetchSubmissions(page - 1);
                    }}
                    className="relative inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-pointer hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                  >
                    Previous
                  </a>
                )}
                {page + 1 !== Math.ceil(total / perPage) && (
                  <a
                    onClick={() => {
                      fetchSubmissions(page + 1);
                    }}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-pointer hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
                  >
                    Next
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
