import React, { useState } from 'react';
import { Rule, RuleMeta } from '../util/interfaces';

interface Props {
  rule: Rule;
  rules: { [key: string]: RuleMeta };
  onRemove: () => void;
}

export const RuleCard = ({ rule, rules, onRemove }: Props) => {
  return (
    <li>
      <div className="flex flex-col">
        <div className="flex flex-row mb-2">
          <div className="flex flex-row">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 text-green-500 my-auto mr-2 flex-shrink-0">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="bg-gray-100 px-2 py-1 focus:outline-none inline-flex items-center">{rule.field}</span>
            <span className="ml-2 mr-2 my-auto">{rules[rule.validator].middleText}</span>
            {rules[rule.validator].requireDetail && <span className="bg-gray-100 px-2 py-1 inline-flex items-center">{rule.detail}</span>}
          </div>
          <span className="inline-flex rounded-md shadow-sm my-auto ml-2">
            <button
              type="button"
              onClick={() => onRemove()}
              className="inline-flex text-red-600 items-center px-2.5 py-1.5 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            >
              Remove
            </button>
          </span>
        </div>
      </div>
      {rule.errorMessage && (
        <div className="text-sm -mt-1 text-gray-600 ml-7 flex flex-row">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 text-gray-500 my-auto mr-1">
            <path
              fill-rule="evenodd"
              d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>
            Custom error message <span className="bg-gray-50 ml-1 px-1 py-1">{rule.errorMessage}</span>
          </span>
        </div>
      )}
    </li>
  );
};
