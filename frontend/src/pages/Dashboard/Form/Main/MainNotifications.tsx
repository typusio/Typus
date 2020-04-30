import React from 'react';

import classNames from 'classnames';
import { useApiForm } from '../../../../util/hooks';

export const MainNotifications = ({ formId }: { formId: string }) => {
  const { loading, handleSubmit, handleChange, values, setValues } = useApiForm(`/notifications/${formId}`, {
    initialValues: { emailsEnabled: false, emails: '', webhooksEnabled: false, webhooks: '' },
    ignoredValues: ['formId', 'id'],
  });

  return (
    <div className="relative">
      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}

      {!loading && (
        <div>
          <form>
            <div>
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Emails</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">We'll only use these addresses for notifications (we promise).</p>
                </div>
                <div className="mt-6 sm:mt-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                      Enabled
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <span
                        role="checkbox"
                        tabIndex={0}
                        aria-checked="false"
                        className={classNames(
                          'relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
                          { 'bg-gray-200': !values.emailsEnabled, 'bg-blue-600': values.emailsEnabled },
                        )}
                        onClick={() => setValues({ ...values, emailsEnabled: !values.emailsEnabled })}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames('inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200', {
                            'translate-x-5': values.emailsEnabled,
                            'translate-x-0': !values.emailsEnabled,
                          })}
                        ></span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                      Addresses
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          name="emails"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Seperated by commas.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Webhooks</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                    Easily connect your form to Zapier, IFTTT and thousands of other services. <span className="text-blue-600">Read more</span>
                  </p>
                </div>
                <div className="mt-6 sm:mt-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                      Enabled
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <span
                        role="checkbox"
                        tabIndex={0}
                        aria-checked="false"
                        className={classNames(
                          'relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
                          { 'bg-gray-200': !values.webhooksEnabled, 'bg-blue-600': values.webhooksEnabled },
                        )}
                        onClick={() => setValues({ ...values, webhooksEnabled: !values.webhooksEnabled })}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames('inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200', {
                            'translate-x-5': values.webhooksEnabled,
                            'translate-x-0': !values.webhooksEnabled,
                          })}
                        ></span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
                      URLs
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <input
                          className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          name="webhooks"
                          value={values.webhooks}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Seperated by commas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="pt-5 mt-8 border-t border-gray-200 px-0 md:absolute md:top-0 md:right-1 md:pt-0 md:mt-0 md:border-none flex flex-row">
            <span className="inline-flex rounded-md shadow-sm mr-2">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Save
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
