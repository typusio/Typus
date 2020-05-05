import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useRouter } from '../../../../util/hooks';
import { MainSubmissions } from './MainSubmissions';
import { MainSettings } from './MainSettings';
import { MainSetup } from './MainSetup';
import { MainValidation } from './MainValidation';
import { MainNotifications } from './MainNotifications';
import { Form } from '../../../../util/interfaces';
import { MainConfirmation } from './MainConfirmation';

export const FormMain = ({ formId }: { formId: string }) => {
  const {
    match: { params },
    location,
    push,
  } = useRouter();

  const SELETCED_STYLE =
    '"ml-8 group inline-flex items-center py-4 px-1 border-b-2 border-blue-500 font-medium text-sm leading-5 text-blue-600 focus:outline-none focus:text-blue-800 focus:border-blue-700 mr-5 cursor-pointer';
  const UNSELECTED_STYLE =
    'group inline-flex items-center py-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 mr-5 cursor-pointer';
  const SELECTED_ICON_STYLE = '-ml-0.5 mr-2 h-5 w-5 text-blue-500 group-focus:text-blue-600';
  const UNSELECTED_ICON_STYLE = '-ml-0.5 mr-2 h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600';

  const [selected, setSelected] = useState('Submissions');

  return (
    <main className="sm:mt-64 mt-70">
      <div className="max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="bg-white pt-1 md:px-6 sm:border-b sm:border-gray-200">
            <div className="pb-4 sm:p-0">
              <div className="md:hidden">
                <select
                  className="form-select block w-full my-auto -mt-1 border-0 focus:outline-none"
                  onChange={e => {
                    setSelected(e.target.value);
                  }}
                >
                  <option>Submissions</option>
                  <option>Setup</option>
                  <option>Validation</option>
                  <option>Notifications</option>
                  <option>Confirmation</option>
                  <option>Settings</option>
                </select>
              </div>
              <hr className="text-gray-100 mt-0.5 block md:hidden" />
              <div className="hidden md:block">
                <div>
                  <nav className="-mb-px flex">
                    <a onClick={() => setSelected('Submissions')} className={selected == 'Submissions' ? SELETCED_STYLE : UNSELECTED_STYLE}>
                      <svg fill="currentColor" viewBox="0 0 20 20" className={selected == 'Submissions' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}>
                        <path
                          fillRule="evenodd"
                          d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Submissions
                    </a>
                    <a onClick={() => setSelected('Setup')} className={selected == 'Setup' ? SELETCED_STYLE : UNSELECTED_STYLE}>
                      <svg fill="currentColor" viewBox="0 0 20 20" className={selected == 'Setup' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}>
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Setup
                    </a>
                    <a onClick={() => setSelected('Validation')} className={selected == 'Validation' ? SELETCED_STYLE : UNSELECTED_STYLE}>
                      <svg fill="currentColor" viewBox="0 0 20 20" className={selected == 'Validation' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}>
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Validation
                    </a>
                    <a onClick={() => setSelected('Notifications')} className={selected == 'Notifications' ? SELETCED_STYLE : UNSELECTED_STYLE}>
                      <svg fill="currentColor" viewBox="0 0 20 20" className={selected == 'Notifications' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}>
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                      </svg>
                      Notifications
                    </a>
                    <a onClick={() => setSelected('Confirmation')} className={selected == 'Confirmation' ? SELETCED_STYLE : UNSELECTED_STYLE}>
                      <svg fill="currentColor" viewBox="0 0 20 20" className={selected == 'Confirmation' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}>
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      Confirmation
                    </a>
                    <a onClick={() => setSelected('Settings')} className={selected == 'Settings' ? SELETCED_STYLE : UNSELECTED_STYLE}>
                      <svg fill="currentColor" viewBox="0 0 20 20" className={selected == 'Settings' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}>
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Settings
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pt-5 pb-3 sm:px-6">
            {selected == 'Submissions' && <MainSubmissions formId={formId} />}
            {selected == 'Setup' && <MainSetup formId={formId} />}
            {selected == 'Validation' && <MainValidation formId={formId} />}
            {selected == 'Notifications' && <MainNotifications formId={formId} />}
            {selected == 'Confirmation' && <MainConfirmation formId={formId} />}
            {selected == 'Settings' && <MainSettings formId={formId} />}
          </div>
        </div>
      </div>
    </main>
  );
};
