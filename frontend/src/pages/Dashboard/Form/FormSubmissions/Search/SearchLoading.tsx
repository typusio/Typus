import React from 'react';
import { Spinner } from '../../../../../components/Spinner';

export const SearchLoading = () => {
  return (
    <div className="w-full">
      <div className="flex mt-8">
        <span className="justify-center mx-auto text-xl text-center">Searching...</span>
      </div>

      <div className="flex flex-row justify-center">
        <Spinner />
      </div>
    </div>
  );
};
