import React, { useState, useEffect } from 'react';
import { gradients } from '../../../util/gradients';
import { Form } from '../../../util/interfaces';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../util/api';

export const DashboardHome = () => {
  const [forms, setForms] = useState<{ form: Form; submissions: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchForms() {
      const data = await fetch(`${API_URL}/form/dashboard`, { credentials: 'include' }).then(res => res.json());

      setForms(data);
      setLoading(false);
    }

    fetchForms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl my-auto">My Forms</h2>
        <span className="inline-flex rounded-md shadow-sm">
          <Link
            type="button"
            to={'/dashboard/new'}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
          >
            <svg className="-ml-1 mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              ></path>
            </svg>
            New Form
          </Link>
        </span>
      </div>

      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {!loading && (
        <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 mt-4 mx-auto gap-4">
          <Link to={`/dashboard/new`} className="rounded-md sm:w-48 w-full h-64 font-semibold text-lg mr-5 mt-1 bg-gray-800">
            <div className="flex flex-col h-full">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10 my-auto text-center text-white mx-auto">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>

          {forms.map((form, index) => (
            <Link
              to={`/dashboard/form/${form.form.id}`}
              style={{ backgroundImage: `linear-gradient(to right, ${gradients[index].colors[0]}, ${gradients[index].colors[1]})` }}
              className="rounded-md sm:w-48 w-full h-64 font-semibold text-lg mr-5 mt-1"
            >
              <div className="flex flex-col h-full">
                <div className="my-auto text-center text-white px-5 sm:text-base text-xl">{form.form.name}</div>
                <div className="my-auto text-center text-white px-5 font-normal sm:text-sm">
                  {form.submissions} submission{form.submissions == 1 ? '' : 's'}
                </div>
              </div>
            </Link>
          ))}
        </main>
      )}
    </div>
  );
};
