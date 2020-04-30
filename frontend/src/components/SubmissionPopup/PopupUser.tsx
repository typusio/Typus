import React, { useEffect, useState } from 'react';
import { Submission } from '../../util/interfaces';
import { API_URL } from '../../util/api';

export const PopupUser = ({ submission }: { submission: Submission }) => {
  const [numSubmissions, setNumSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      const data = await fetch(`${API_URL}/ip/${submission.form.id}/${submission.ip.address}`, { credentials: 'include' }).then(res => res.json());

      setNumSubmissions(data.length);
      setLoading(false);
    }

    fetchSubmissions();
  }, []);

  return (
    <div>
      <div className="flex flex-row mt-5">
        <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 text-gray-700">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>

        <h3 className="text-lg leading-6 font-medium text-gray-900 ml-2">
          User <span className="text-gray-600 text-xs">({submission.ip.address})</span>
        </h3>
      </div>

      <h2 className="sm:ml-7">
        This user has created <span className="font-bold">{loading ? 'loading...' : numSubmissions - 1}</span> other submissions.
      </h2>
    </div>
  );
};
