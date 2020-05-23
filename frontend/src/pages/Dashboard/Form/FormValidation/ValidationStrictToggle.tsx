import React from 'react';
import { HelpCircle } from '../../../../components/HelpCircle';
import classNames from 'classnames';

export const ValidationStrictToggle = ({ value, onClick }: { value: boolean; onClick: () => void }) => {
  return (
    <div className="flex flex-row">
      <h3 className="flex flex-row justify-center my-auto text-base leading-6 text-gray-900 sm:ml-2">
        Strict{' '}
        <span>
          <HelpCircle link={''} />
        </span>
      </h3>

      <span
        role="checkbox"
        tabIndex={0}
        className="relative inline-flex items-center justify-center flex-shrink-0 w-10 h-5 my-auto ml-2 cursor-pointer group focus:outline-none"
        onClick={onClick}
      >
        <span
          aria-hidden="true"
          className={classNames('absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200', {
            'bg-gray-200': !value,
            'bg-blue-600': value,
          })}
        ></span>
        <span
          aria-hidden="true"
          aria-checked={value}
          className={classNames(
            'translate-x-0 absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform group-focus:shadow-outline group-focus:border-blue-300 transition-transform ease-in-out duration-200',
            { 'translate-x-5': value, 'translate-x-0': !value },
          )}
        ></span>
      </span>
    </div>
  );
};
