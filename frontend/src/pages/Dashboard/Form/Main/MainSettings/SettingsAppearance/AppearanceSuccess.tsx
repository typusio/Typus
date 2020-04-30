import React from 'react';
import { SketchPicker } from 'react-color';
import classNames from 'classnames';
import { API_URL } from '../../../../../../util/api';

// TODO: Refactor to not use any
interface Props {
  values: { [key: string]: any };
  setValues: (values: any) => any;
  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
  formId: string;
}

export const AppearanceSuccess = ({ values, setValues, handleChange, formId }: Props) => {
  const SELECTED_STYLE =
    'cursor-pointer px-3 py-2 font-medium text-sm leading-5 rounded-md text-blue-700 bg-blue-100 focus:outline-none focus:text-blue-800 focus:bg-blue-200';
  const UNSELECTED_STYLE =
    'cursor-pointer px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-blue-600 focus:bg-blue-50';

  return (
    <div className="w-full mt-4">
      <div className="w-full">
        <div className="flex flex-row">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Success Page</h3>
          <div className="flex flex-col justify-end">
            <span className="text-blue-600 text-sm ml-2 cursor-pointer" onClick={() => window.open(`${API_URL}/appearance/${formId}/preview/success`)}>
              (Preview)
            </span>
          </div>
        </div>
        <div className="mt-2">
          <nav className="flex">
            <a className={values.successMode == 'Our' ? SELECTED_STYLE : UNSELECTED_STYLE} onClick={() => setValues({ ...values, successMode: 'Our' })}>
              Use our page
            </a>
            <a
              className={(values.successMode == 'Custom' ? SELECTED_STYLE : UNSELECTED_STYLE) + ' ml-2'}
              onClick={() => setValues({ ...values, successMode: 'Custom' })}
            >
              Use a custom page
            </a>
          </nav>
        </div>

        {values.successMode == 'Custom' && (
          <div className="mt-6 sm:mt-5 sm:border-t sm:border-gray-200 sm:pt-5 max-w-full">
            <div>
              <label className="block text-sm font-medium leading-5 text-gray-700">Custom Page URL</label>
              <div className="mt-1 rounded-md shadow-sm max-w-full">
                <input
                  className="form-input block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={values.successCustomRedirect}
                  name="successCustomRedirect"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {values.successMode == 'Our' && (
          <div>
            <div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">Text</label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <textarea
                    rows={2}
                    className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    value={values.successText}
                    onChange={handleChange}
                    name="successText"
                  ></textarea>
                </div>
              </div>

              <label htmlFor="about" className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2 mb-1 mt-2 sm:mb-0 sm:mt-0">
                Show dots
              </label>
              <span
                role="checkbox"
                tabIndex={0}
                className={classNames(
                  'bg-gray-200 relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline mb-2',
                  {
                    'bg-blue-600': values.successDots,
                    'bg-gray-200': !values.successDots,
                  },
                )}
                onClick={() => setValues({ ...values, successDots: !values.successDots })}
              >
                <span
                  className={classNames('translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200', {
                    'translate-x-5': values.successDots,
                    'translate-x-0': !values.successDots,
                  })}
                ></span>
              </span>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mx-auto mt-4">
              <div className="mb-6">
                <label className="block text-sm font-medium leading-5 text-gray-700">Tick background color</label>

                <div className="mt-2">
                  <SketchPicker color={values.successTickBackground} onChangeComplete={color => setValues({ ...values, successTickBackground: color.hex })} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium leading-5 text-gray-700">Tick color</label>

                <div className="mt-2">
                  <SketchPicker color={values.successTickColor} onChangeComplete={color => setValues({ ...values, successTickColor: color.hex })} />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium leading-5 text-gray-700">Background Color</label>

                <div className="mt-2">
                  <SketchPicker color={values.successBackgroundColor} onChangeComplete={color => setValues({ ...values, successBackgroundColor: color.hex })} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
