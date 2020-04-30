import React, { useState, useEffect } from 'react';
import { AppearanceSuccess } from './AppearanceSuccess';
import { AppearanceError } from './AppearanceError';
import { useApiForm } from '../../../../../../util/hooks';

export const SettingsAppearance = ({ formId }: { formId: string }) => {
  const { loading, handleChange, values, setValues, handleSubmit } = useApiForm(`/appearance/${formId}`, {
    initialValues: {
      successMode: 'Our',
      successCustomRedirect: '',
      successTickBackground: '',
      successTickColor: '',
      successText: '',
      successBackgroundColor: '',
      successDots: true,

      errorMode: '',
      errorCustomRedirect: '',
      errorIconBackground: '',
      errorIconColor: '',
      errorBackgroundColor: '',
      errorDots: true,
    },
    ignoredValues: ['formId', 'id'],
  });

  return (
    <form>
      {loading && (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )}
      {!loading && (
        <div>
          <AppearanceSuccess handleChange={handleChange} values={values} setValues={setValues} formId={formId} />
          <AppearanceError handleChange={handleChange} values={values} setValues={setValues} formId={formId} />

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
        </div>
      )}
    </form>
  );
};
