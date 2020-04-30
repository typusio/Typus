import React, { useState, useEffect } from 'react';
import { Submission } from '../../../../util/interfaces';
import moment from 'moment';

import classNames from 'classnames';
import { SelectedDeleteBanner } from './SelectedDeleteBanner';
import { SubmissionPopup } from '../../../../components/SubmissionPopup';

import Void from '../../../../assets/void.svg';
import { API_URL } from '../../../../util/api';

export const MainSubmissions = ({ formId }: { formId: string }) => {
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const [shown, setShown] = useState<Submission[]>([]);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number[]>([]);

  const [popup, setPopup] = useState(0);

  async function fetchSubmissions(page: number = 0) {
    setLoading(true);
    const res = await fetch(`${API_URL}/${formId}/submissions?perPage=${perPage}&page=${page}`, { credentials: 'include' });
    const data = await res.json();

    setShown(data.submissions);
    setTotal(data.total);

    setPage(page);
    setLoading(false);
  }

  async function deleteSubmissions() {
    const res = await fetch(`${API_URL}/${formId}/submissions`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissions: selected }),
      credentials: 'include',
    });

    setShown(shown.filter(s => !selected.includes(s.id)));
    setTotal(total - selected.length);
    setSelected([]);

    const maxPage = Math.ceil((total - selected.length) / perPage) - 1;

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
        formId={formId}
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

      {!loading && total == 0 && (
        <div>
          <img src={Void} className="w-1/4 h-1/4 mt-2 mx-auto"></img>
          <h2 className="text-center text-xl mt-3 mb-5">No submissions yet</h2>
        </div>
      )}

      {shown.length !== 0 && (
        <div>
          <div className="mb-3 sm:mb-0">
            <div className="flex rounded-md ">
              <input
                id="remember_me"
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out my-auto ml-1 mr-3 sm:ml-2"
                onChange={e => {
                  if (e.target.checked) {
                    return setSelected(shown.map(s => s.id));
                  }

                  setSelected([]);
                }}
              />
              <div className="relative flex-grow focus-within:z-10 flex rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  id="filter"
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                  placeholder="Search submissions"
                />
              </div>
            </div>
          </div>
          <ul>
            {shown.map((sub, index) => (
              <li>
                <a
                  className={classNames('block hover:bg-gray-50 focus:outline-none transition duration-150 ease-in-out cursor-pointer', {
                    'bg-gray-100 hover:bg-gray-200': index % 2 !== 0,
                  })}
                  onClick={e => {
                    if ((e.target as any).value != undefined) return;

                    setPopup(sub.id);
                  }}
                >
                  <div className="flex items-center px-4 py-4 sm:px-6 relative">
                    <input
                      id="remember_me"
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out absolute sm:left-2 left-1 z-20"
                      style={{ top: '40%' }}
                      checked={selected.includes(sub.id)}
                      onChange={e => {
                        if (!e.target.checked) {
                          return setSelected(selected.filter(s => s !== sub.id));
                        }

                        setSelected(arr => [...arr, sub.id]);
                      }}
                    />

                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4 relative">
                        <div>
                          <table className="text-sm">
                            <tbody>
                              {Object.keys(JSON.parse(sub.data)).map(key => (
                                <tr>
                                  <td className="text-gray-600 pr-5">{key} </td>
                                  <td className="max-w-xs truncate break-normal">{JSON.parse(sub.data)[key]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <div className="text-sm leading-5 text-gray-900">Created {moment(sub.createdAt).fromNow()}</div>
                            <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
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
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
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
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:block">
              <p className="text-sm leading-5 text-gray-700">
                Showing page <span className="font-medium">{page + 1}</span> of<span className="font-medium"> {Math.ceil(total / perPage)}</span>
              </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
              {page !== 0 && (
                <a
                  onClick={() => {
                    fetchSubmissions(page - 1);
                  }}
                  className="mr-2 cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >
                  Previous
                </a>
              )}
              {page + 1 !== Math.ceil(total / perPage) && (
                <a
                  onClick={() => {
                    fetchSubmissions(page + 1);
                  }}
                  className="cursor-pointer relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
                >
                  Next
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
