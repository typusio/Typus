import React from 'react';
import { Submission } from '../../util/interfaces';
import moment from 'moment';

export const PopupInfo = ({ submission }: { submission: Submission }) => {
  return (
    <div>
      <div className="flex flex-row mt-5">
        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-2">Info</h3>
      </div>
      <div className="sm:ml-7">
        <div className="flex flex-row">
          <span className="my-auto ml-1">Created on {moment(submission.createdAt).format('LLLL')}</span>
        </div>
      </div>
    </div>
  );
};
