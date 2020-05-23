import React, { useState, useContext } from 'react';
import { Rule, RuleMeta } from '../../../../util/interfaces';

import classNames from 'classnames';
import { useFormik, ErrorMessage } from 'formik';
import { API_URL } from '../../../../api/api';
import { FormContext } from '../../../../store/FormContext';
import { useToasts } from '../../../../store/ToastContext';

interface Props {
  rule: Rule;
  meta: RuleMeta;
  onRemove: () => void;
}

export const RuleCard = ({ rule, meta, onRemove }: Props) => {
  const { form } = useContext(FormContext);
  const [isEditing, setIsEditing] = useState(false);

  const { addToast } = useToasts();

  const [resetValues, setResetValues] = useState({
    field: rule.field,
    detail: rule.detail,
    errorMessage: rule.errorMessage,
  });

  const { values, handleChange, handleSubmit, setValues } = useFormik({
    initialValues: resetValues,
    async onSubmit(values) {
      setResetValues(values);
      if (!meta.requireDetail) delete values.detail;

      setIsEditing(false);

      await fetch(`${API_URL}/validation/${form.id}/${rule.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      rule = { ...rule, ...values };

      addToast('Saved rule', { type: 'success' });
    },
  });

  return (
    <li className="mt-2">
      <div className="flex flex-col">
        <div className="flex flex-row mb-2">
          <div className="flex flex-row">
            <button
              aria-label={meta.required ? 'This rule will always be checked' : 'This rule will only be checked if the field is not blank'}
              data-balloon-pos="right"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={classNames('flex-shrink-0 w-5 h-5 my-auto mr-2', { 'text-green-500': meta.required, 'text-yellow-400': !meta.required })}
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            {!isEditing && <span className="inline-flex items-center px-2 py-1 bg-gray-100 focus:outline-none">{values.field}</span>}
            {isEditing && (
              <div className="relative rounded-md shadow-sm w-36">
                <input
                  className="block w-full form-input sm:text-sm sm:leading-5"
                  placeholder="Field"
                  name="field"
                  value={values.field}
                  onChange={handleChange}
                />
              </div>
            )}
            <span className="my-auto ml-2 mr-2">{meta.middleText}</span>
            {meta.requireDetail && (
              <>
                {!isEditing && <span className="inline-flex items-center px-2 py-1 bg-gray-100">{values.detail}</span>}
                {isEditing && (
                  <div className="relative rounded-md shadow-s w-36">
                    <input
                      className="block w-full h-full mr-2 form-input sm:text-sm sm:leading-5"
                      placeholder={meta.detailSubtext}
                      name="detail"
                      value={values.detail}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className={classNames('flex flex-col justify-center', { 'ml-2': meta.requireDetail })}>
            <div>
              {!isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemove()}
                    className="ml-1 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150"
                  >
                    Remove
                  </button>
                </>
              )}

              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-blue-200 transition ease-in-out duration-150"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setValues(resetValues);

                      setIsEditing(false);
                    }}
                    className="ml-1 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none focus:border-gray-300 focus:shadow-outline-gray active:bg-gray-200 transition ease-in-out duration-150"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {rule.errorMessage !== '' && values.errorMessage !== '' && (
        <>
          {!isEditing && (
            <div className="flex flex-row -mt-1 text-sm text-gray-600 ml-7">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 my-auto mr-1 text-gray-500">
                <path
                  fill-rule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>
                Custom error message <span className="px-1 py-1 ml-1 bg-gray-50">{values.errorMessage}</span>
              </span>
            </div>
          )}

          {isEditing && (
            <div className="flex flex-row -mt-1 text-sm text-gray-600 ml-7">
              <svg fill="currentColor" viewBox="0 0 20 20" className="flex-shrink-0 w-4 h-4 my-auto mr-1 text-gray-500">
                <path
                  fill-rule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="flex flex-row">
                <span className="flex flex-col justify-center">
                  Custom error message {!isEditing && <span className="px-1 py-1 my-auto bg-gray-50">{values.detail}</span>}
                </span>
                {isEditing && (
                  <div className="relative rounded-md shadow-s">
                    <input
                      className="block w-full h-full ml-1 form-input sm:text-sm sm:leading-5"
                      placeholder={meta.defaultError}
                      name="errorMessage"
                      value={values.errorMessage}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </span>
            </div>
          )}
        </>
      )}
    </li>
  );
};
