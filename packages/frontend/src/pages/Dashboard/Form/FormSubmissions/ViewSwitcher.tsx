import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

export const ViewSwitcher = ({ view, setView }: { view: 'list' | 'table'; setView: React.Dispatch<React.SetStateAction<'list' | 'table'>> }) => {
  const SELECTED_COLORS = 'text-blue-500 bg-blue-100 border-blue-300 hover:text-blue-400 active:bg-blue-200 active:text-blue-500';
  const UNSELECTED_COLORS = 'text-gray-500 bg-white border-gray-300 hover:text-gray-400 active:bg-gray-100 active:text-gray-500';

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    window.localStorage.setItem('viewPreference', view);
  }, [view]);

  useEffect(() => {
    const value = window.localStorage.getItem('viewPreference');

    if (!value || !['list', 'table'].includes(value)) return;

    setView(value as 'list' | 'table');
  }, []);

  return (
    <span className="relative z-0 inline-flex ml-2 shadow-sm">
      <button
        type="button"
        className={classNames(
          'relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out border rounded-l-md focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue',
          { [SELECTED_COLORS]: view === 'table', [UNSELECTED_COLORS]: view !== 'table' },
        )}
        onClick={() => setView('table')}
      >
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
          <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z"></path>
        </svg>
      </button>
      <button
        type="button"
        className={classNames(
          'relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 transition duration-150 ease-in-out border rounded-r-md focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue',
          { [SELECTED_COLORS]: view === 'list', [UNSELECTED_COLORS]: view !== 'list' },
        )}
        onClick={() => setView('list')}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          ></path>
        </svg>
      </button>
    </span>
  );
};
