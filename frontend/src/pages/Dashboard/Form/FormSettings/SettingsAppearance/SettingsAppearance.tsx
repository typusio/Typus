import React, { useContext } from 'react';
import { AppearanceSuccess } from './AppearanceSuccess';
import { AppearanceError } from './AppearanceError';
import { useApiForm } from '../../../../../util/hooks';
import { FormContext } from '../../../../../store/FormContext';
import { Spinner } from '../../../../../components/Spinner';

export const SettingsAppearance = () => {
  const { form } = useContext(FormContext);

  const { loading, handleChange, values, setValues, handleSubmit } = useApiForm(`/appearance/${form.id}`, {
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
      {loading && <Spinner />}

      {!loading && (
        <div>
          <AppearanceSuccess handleChange={handleChange} values={values} setValues={setValues} />
          <AppearanceError handleChange={handleChange} values={values} setValues={setValues} />

          <div className="pt-5 mt-8 border-t border-gray-200">
            <div className="flex justify-end">
              <span className="inline-flex ml-3 rounded-md shadow-sm">
                <button
                  onClick={e => {
                    e.preventDefault();

                    handleSubmit();
                  }}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700"
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
