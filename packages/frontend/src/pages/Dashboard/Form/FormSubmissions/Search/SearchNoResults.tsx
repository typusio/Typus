import React from 'react';
import FileSearching from '../../../../../assets/file-searching.svg';

export const SearchNoResults = ({ query }: { query: string }) => {
  return (
    <div className="mt-2">
      <img src={FileSearching} alt="" className="w-48 mx-auto" />
      <div className="flex flex-col mt-3">
        <span className="text-xl text-center">No results found for "{query}".</span>
        <span className="mt-1 text-center text-gray-500">Try searching something else?</span>
      </div>
    </div>
  );
};
