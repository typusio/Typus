import React from 'react';
import { Submission } from '../../util/interfaces';
import moment from 'moment';

export const PopupInfo = ({ submission }: { submission: Submission }) => {
  return (
    <div>
      <div className="flex flex-row mt-5">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-5 h-5 text-gray-700"
        >
          <path d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
        </svg>

        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-2">Info</h3>
      </div>
      <div className="sm:ml-7">
        <div className="flex flex-row">
          <svg fill="currentColor" viewBox="0 0 20 20" className="h-5 w-5 text-gray-700 my-auto flex-shrink-0">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
          <span className="my-auto ml-1">Created on {moment(submission.createdAt).format('LLLL')}</span>
        </div>
      </div>
    </div>
  );
};
