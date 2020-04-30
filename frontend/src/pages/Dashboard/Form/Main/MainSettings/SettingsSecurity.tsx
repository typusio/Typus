import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

import classNames from 'classnames';
import { API_URL } from '../../../../../util/api';
import { useApiForm } from '../../../../../util/hooks';

export const SettingsSecurity = ({ formId }: { formId: string }) => {
  const { loading, values, setValues, handleChange, handleSubmit } = useApiForm(`/security/${formId}`, {
    initialValues: {
      recaptchaSecret: '',
      honey: '',
      allowedDomains: '',
      recaptchaEnabled: false,
    },
    ignoredValues: ['formId', 'id'],
  });

  return (
    <div className="mt-4">
      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
      {!loading && (
        <form>
          <div>
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">ReCaptcha</h3>
                <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                  Help secure your form with AI powered protection. <span className="text-blue-600 cursor-pointer font-semibold">Read more</span>
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
                      className={classNames(
                        'relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline',
                        { 'bg-gray-200': !values.recaptchaEnabled, 'bg-blue-600': values.recaptchaEnabled },
                      )}
                      onClick={() => setValues({ ...values, recaptchaEnabled: !values.recaptchaEnabled })}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames('inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200', {
                          'translate-x-0': !values.recaptchaEnabled,
                          'translate-x-5': values.recaptchaEnabled,
                        })}
                      ></span>
                    </span>
                  </div>
                </div>

                <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">Secret</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg rounded-md shadow-sm">
                      <input
                        className={classNames('form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5', {
                          'bg-gray-100': !values.recaptchaEnabled,
                        })}
                        disabled={!values.recaptchaEnabled}
                        name="recaptchaSecret"
                        value={values.recaptchaSecret}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-800" id="email-description">
                      Wondering how to get this?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Honeypot Field</h3>
                <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                  Lure in bots by having a hidden field on your site. <span className="text-blue-600 cursor-pointer font-semibold">Read more</span>
                </p>
              </div>
              <div className="mt-6 sm:mt-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">Field name</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-xs rounded-md shadow-sm">
                      <input
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        name="honey"
                        value={values.honey}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 sm:mt-5 sm:pt-10">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Allowed Domains</h3>
                <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
                  Restrict submissions to only come from certail domains. <span className="text-blue-600 cursor-pointer font-semibold">Read more</span>
                </p>
              </div>
              <div className="mt-6 sm:mt-5">
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">Domains</label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg rounded-md shadow-sm">
                      <input
                        className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        name="allowedDomains"
                        value={values.allowedDomains}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500" id="email-description">
                      Seperated by commas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-5">
            <div className="flex justify-end">
              <span className="ml-3 inline-flex rounded-md shadow-sm">
                <button
                  onClick={e => {
                    e.preventDefault();

                    handleSubmit();
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
