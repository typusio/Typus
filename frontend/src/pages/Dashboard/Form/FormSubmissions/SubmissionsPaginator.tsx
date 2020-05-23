import React from 'react';

interface Props {
  page: number;
  total: number;
  perPage: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const SubmissionsPaginator = ({ page, total, perPage, onNext, onPrevious }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="hidden sm:block">
        <p className="text-sm leading-5 text-gray-700">
          Showing page <span className="font-medium">{page + 1}</span> of<span className="font-medium"> {Math.ceil(total / perPage)}</span>
        </p>
      </div>
      <div className="flex justify-between flex-1 sm:justify-end">
        {page !== 0 && (
          <a
            onClick={onPrevious}
            className="relative inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-pointer hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
          >
            Previous
          </a>
        )}
        {page + 1 !== Math.ceil(total / perPage) && (
          <a
            onClick={onNext}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-pointer hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
};
