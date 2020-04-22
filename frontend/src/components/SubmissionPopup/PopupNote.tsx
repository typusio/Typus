import React, { useState, useEffect } from 'react';
import { Submission } from '../../util/interfaces';
import { useToasts } from 'react-toast-notifications';
import { useDebounce } from '../../util/hooks';
import { API_URL } from '../../util/api';

export const PopupNote = ({ submission }: { submission: Submission }) => {
  const [value, setValue] = useState(submission.note);

  const debouncedValue = useDebounce(value, 1000);

  const { addToast } = useToasts();

  useEffect(() => {
    async function saveNote() {
      const res = await fetch(`${API_URL}/${submission.form.id}/${submission.id}/note`, {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify({ note: value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    saveNote();
  }, [debouncedValue]);
  return (
    <div>
      <div className="flex flex-row mt-5">
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 text-gray-700">
          <path
            fillRule="evenodd"
            d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
            clipRule="evenodd"
          ></path>
        </svg>

        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-2">Notes</h3>
      </div>
      <div className="sm:ml-7">
        <div className="w-full flex rounded-md shadow-sm mt-2">
          <textarea
            className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            value={value}
            onChange={e => setValue(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-row justify-between">
          <p className="text-sm text-gray-500 mt-1">Only you can see this</p>
        </div>
      </div>
    </div>
  );
};
