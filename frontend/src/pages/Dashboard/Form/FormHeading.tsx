import React, { useContext, useState, useEffect } from 'react';
import { FormContext } from '../../../store/FormContext';
import { ExportButton } from './FormExportButton';
import { FormRedButton } from './FormRedButton';
import { FormCounts } from '../../../util/interfaces';
import { API_URL } from '../../../util/api';
import { useObserver } from 'mobx-react-lite';

export const FormHeading = () => {
  const formContext = useContext(FormContext);

  const [counts, setCounts] = useState<FormCounts>();

  useEffect(() => {
    async function fetchCounts() {
      const data = await fetch(`${API_URL}/form/${formContext.form.id}/counts`, { credentials: 'include' }).then(res => res.json());

      setCounts(data as FormCounts);
    }

    fetchCounts();

    const interval = setInterval(() => fetchCounts(), 30000);
    return () => clearInterval(interval);
  }, []);

  return useObserver(() => (
    <header className="py-10 -my-64">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">{formContext.form.name}</h2>
            {counts && (
              <div className="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap">
                <div className="flex items-center mt-2 text-sm leading-5 text-gray-300 sm:mr-6">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500">
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {counts.submissions} submission{counts.submissions == 1 ? '' : 's'}
                </div>
                <div className="flex items-center mt-2 text-sm leading-5 text-gray-300 sm:mr-6">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {counts.spam} marked as spam
                </div>
                <div className="flex items-center mt-2 text-sm leading-5 text-gray-300 sm:mr-6">
                  <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {counts.today} submission{counts.today == 1 ? '' : 's'} today
                </div>
              </div>
            )}
          </div>
          <div className="flex mt-5 lg:mt-0 lg:ml-4">
            <ExportButton />
            <FormRedButton />
          </div>
        </div>
      </div>
    </header>
  ));
};
