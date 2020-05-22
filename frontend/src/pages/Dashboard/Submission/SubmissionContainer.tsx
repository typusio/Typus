import React from 'react';
import { SubmissionData } from './SubmissionData';
import { SubmissionNote } from './SubmissionNote';

export const SubmissionContainer = () => {
  return (
    <main className="sm:mt-64 mt-70">
      <div className="px-4 pb-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between w-full">
          <div className="sm:w-2/3">
            <SubmissionData />
          </div>

          <div className="sm:w-1/3">
            <SubmissionNote />
          </div>
        </div>
      </div>
    </main>
  );
};
