import React from 'react';

export const HelpCircle = ({ link }: { link: string }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="text-blue-600 cursor-pointer" onClick={() => window.open(link)}>
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
          <path
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
};
