import React, { useState, useEffect } from 'react';
import { gradients } from '../../../util/gradients';
import { Form } from '../../../util/interfaces';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../api/api';
import { Spinner } from '../../../components/Spinner';

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

  function generateGradient(id: string) {
    let total = 0;

    for (const letter of id.split('')) {
      total += letter.charCodeAt(0);
    }

    return gradients[Math.floor(parseFloat(`0.${total.toFixed(0)}`) * gradients.length)];
  }

  return (
    <div className="px-4 mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-row justify-between">
        <h2 className="my-auto text-2xl">My Forms</h2>
        <span className="inline-flex rounded-md shadow-sm">
          <Link
            type="button"
            to={'/dashboard/new'}
            className="inline-flex items-center px-6 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
          >
            <svg className="w-5 h-5 mr-3 -ml-1" fill="currentColor" viewBox="0 0 20 20">
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

      {loading && <Spinner />}

      {!loading && (
        <main className="grid grid-cols-1 gap-4 mx-auto mt-4 sm:grid-cols-3 lg:grid-cols-5">
          <Link to={`/dashboard/new`} className="w-full h-64 mt-1 mr-5 text-lg font-semibold bg-gray-800 rounded-md sm:w-48">
            <div className="flex flex-col h-full">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-10 h-10 mx-auto my-auto text-center text-white">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </Link>

          {forms.map(form => (
            <Link
              to={`/dashboard/form/${form.form.id}`}
              style={{ backgroundImage: `linear-gradient(to right, ${generateGradient(form.form.id)[0]}, ${generateGradient(form.form.id)[1]})` }}
              className="w-full h-64 mt-1 mr-5 text-lg font-semibold rounded-md sm:w-48"
            >
              <div className="flex flex-col h-full">
                <div className="px-5 my-auto text-xl text-center text-white sm:text-base">{form.form.name}</div>
                <div className="px-5 my-auto font-normal text-center text-white sm:text-sm">
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
