import React, { useContext, useMemo } from 'react';
import { FormContext } from '../../../store/FormContext';
import classNames from 'classnames';

export const SubmissionData = () => {
  const { currentSubmission } = useContext(FormContext);

  const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const parsed = useMemo(() => JSON.parse(currentSubmission!.data), [currentSubmission]);

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Data</h3>
        <p className="max-w-2xl mt-1 text-sm leading-5 text-gray-500">All the fields that were submitted.</p>
      </div>
      <div>
        <dl>
          {Object.keys(parsed).map((key, index) => (
            <div className={classNames('px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6', { 'bg-gray-50': index % 2 !== 0 })}>
              <dt className="text-sm font-medium leading-5 text-gray-500">{capitalize(key)}</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">{parsed[key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
