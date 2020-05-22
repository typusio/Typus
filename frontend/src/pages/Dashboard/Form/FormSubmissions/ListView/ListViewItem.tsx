import React, { useContext, useMemo } from 'react';
import { Submission } from '../../../../../util/interfaces';
import classNames from 'classnames';
import { FormViewContext } from '../../../../../store/FormViewContext';
import moment from 'moment';

export const ListViewItem = ({ submission, index }: { submission: Submission; index: number }) => {
  const { setPopup, setSelected, selected } = useContext(FormViewContext);

  const parsed = useMemo(() => JSON.parse(submission.data), [submission]);

  return (
    <li className="mt-2">
      <a
        className={classNames('block hover:bg-gray-50 focus:outline-none transition duration-150 ease-in-out cursor-pointer', {
          'bg-gray-100 hover:bg-gray-200': index % 2 !== 0,
        })}
        onClick={e => {
          if ((e.target as any).value != undefined) return;

          setPopup(submission.id);
        }}
      >
        <div className="relative flex items-center px-4 py-4 sm:px-6">
          <input
            type="checkbox"
            className="absolute z-20 w-5 h-5 text-blue-600 transition duration-150 ease-in-out form-checkbox sm:left-2 left-1"
            style={{ top: '40%' }}
            checked={selected.includes(submission.id)}
            onChange={e => {
              if (!e.target.checked) {
                return setSelected(selected.filter(s => s !== submission.id));
              }

              setSelected(arr => [...arr, submission.id]);
            }}
          />

          <div className="flex items-center flex-1 min-w-0">
            <div className="relative flex-1 min-w-0 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <table className="text-sm">
                  <tbody>
                    {Object.keys(parsed)
                      .splice(0, 4)
                      .map(key => (
                        <tr>
                          <td className="pr-5 text-gray-600">{key} </td>
                          <td className="max-w-xs break-normal truncate">{parsed[key]}</td>
                        </tr>
                      ))}
                    {Object.keys(parsed).length > 4 && <tr>...{Object.keys(parsed).length - 4} more fields</tr>}
                  </tbody>
                </table>
              </div>
              <div className="hidden md:block">
                <div>
                  <div className="text-sm leading-5 text-gray-900">Created {moment(submission.createdAt).fromNow()}</div>
                  <div className="flex items-center mt-2 text-sm leading-5 text-gray-500">
                    Created from {submission.ip.address}
                    {submission.spam && (
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
  );
};
