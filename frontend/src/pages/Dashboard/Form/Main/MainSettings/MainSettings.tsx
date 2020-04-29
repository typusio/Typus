import React, { useState } from 'react';
import { SettingsAppearance } from './SettingsAppearance/SettingsAppearance';

import classNames from 'classnames';
import { SettingsCollaborators } from './SettingsCollaborators';
import { SettingsGeneral } from './SettingsGeneral';
import { SettingsSecurity } from './SettingsSecurity';

export const MainSettings = ({ formId }: { formId: string }) => {
  const [selected, setSelected] = useState('General');

  const SELECTED_STYLE =
    'cursor-pointer mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md bg-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150';
  const UNSELECTED_STYLE =
    'cursor-pointer mt-1 group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150';

  const SELECTED_ICON_STYLE =
    'flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150';
  const UNSELECTED_ICON_STYLE =
    '"flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150';

  return (
    <div className="flex flex-col sm:flex-row">
      <nav className="w-full md:w-1/5 sm:w-1/4 -mt-7 sm:-mt-3">
        <a onClick={() => setSelected('General')} className={selected == 'General' ? SELECTED_STYLE : UNSELECTED_STYLE}>
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className={selected == 'General' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}
          >
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="truncate">General</span>
        </a>
        <a onClick={() => setSelected('Appearance')} className={selected == 'Appearance' ? SELECTED_STYLE : UNSELECTED_STYLE}>
          <svg className={selected == 'Appearance' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE} stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              strokeWidth="2"
            ></path>
          </svg>
          <span className="truncate">Appearance</span>
        </a>
        <a onClick={() => setSelected('Collaborators')} className={selected == 'Collaborators' ? SELECTED_STYLE : UNSELECTED_STYLE}>
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className={selected == 'Collaborators' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}
          >
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span className="truncate">Collaborators</span>
        </a>
        <a onClick={() => setSelected('Security')} className={selected == 'Security' ? SELECTED_STYLE : UNSELECTED_STYLE}>
          <svg
            className={selected == 'Collaborators' ? SELECTED_ICON_STYLE : UNSELECTED_ICON_STYLE}
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
          </svg>
          <span className="truncate">Security</span>
        </a>
      </nav>
      <div className="sm:ml-5 md:w-4/5 sm:3/4">
        {selected == 'General' && <SettingsGeneral formId={formId} />}
        {selected == 'Appearance' && <SettingsAppearance formId={formId} />}
        {selected == 'Collaborators' && <SettingsCollaborators formId={formId} />}
        {selected == 'Security' && <SettingsSecurity formId={formId} />}
      </div>
    </div>
  );
};
