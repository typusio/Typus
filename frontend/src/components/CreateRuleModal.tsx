import React, { useState, useRef } from 'react';
import { RuleMeta, Rule } from '../util/interfaces';
import { Transition } from '../components/Transition';
import { useFormik } from 'formik';

import classNames from 'classnames';

import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useOutsideClick } from '../util/hooks';
import { API_URL } from '../util/api';

interface Props {
  rules: { [key: string]: RuleMeta };
  formId: string;
  onCreate: (rule: Rule) => void;
  onClose: () => void;
  open: boolean;
}

export const CreateRuleModal = ({ rules, formId, onCreate, onClose, open }: Props) => {
  const [selected, setSelected] = useState<RuleMeta>(rules['greaterThan']);
  const { addToast } = useToasts();

  const findByName = (name: string) => {
    for (const key of Object.keys(rules)) {
      if (rules[key].name == name) return key;
    }

    return 'greaterThan';
  };

  const modalRef = useRef();
  useOutsideClick(modalRef, () => onClose());

  const { values, setFieldError, handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      field: '',
      detail: '',
      errorMessage: '',
    },
    validationSchema: yup.object().shape({
      field: yup.string().required('Field name cannot be blank'),
      detail: yup.string(),
      errorMessage: yup.string(),
    }),
    async onSubmit() {
      if (validate()) return;

      const res = await fetch(`${API_URL}/validation/${formId}/rule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field: values.field, validator: findByName(selected.name), detail: values.detail, errorMessage: values.errorMessage }),
        credentials: 'include',
      });

      if (res.status == 400) {
        if ((await res.text()) == 'You already have a rule for this field with the same action') {
          return addToast('You already have this rule for this field', { appearance: 'error', autoDismiss: true });
        }

        return;
      }

      onCreate(await res.json());

      return;
    },
  });

  const validate = () => {
    if (!values.detail && selected.requireDetail) {
      setFieldError('detail', 'Detail cannot be empty');
      return true;
    }

    return false;
  };

  return (
    <Transition show={open}>
      <div className="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
        </Transition>

        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full overflow-hidden" ref={modalRef as any}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-green-600">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Create new rule</h3>
                  <div className="mt-2 flex flex-row w-full">
                    <div className="w-full">
                      <div className="mt-1 relative rounded-md shadow-sm flex flex-col">
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            className={classNames('form-input block w-full sm:text-sm sm:leading-5', { 'shadow-outline-red border-red-300': errors.field })}
                            placeholder="Field name"
                            name="field"
                            value={values.field}
                            onChange={handleChange}
                          />
                        </div>
                        <p className="text-red-500 transition text-sm pt-0.5">{errors.field}</p>
                        <select
                          aria-label="Selected tab"
                          className="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
                          onChange={e => setSelected(rules[findByName(e.target.value)])}
                        >
                          {Object.keys(rules).map(key => (
                            <option key={key}>{rules[key].name}</option>
                          ))}
                        </select>
                        {selected && selected.requireDetail && (
                          <div>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                className={classNames('form-input block w-full sm:text-sm sm:leading-5', {
                                  'shadow-outline-red border-red-300': errors.detail,
                                })}
                                placeholder={selected.detailSubtext}
                                value={values.detail}
                                onChange={handleChange}
                                name="detail"
                              />
                            </div>
                            <p className="text-red-500 transition text-sm pt-0.5">{errors.detail}</p>
                          </div>
                        )}

                        <div className="mt-5">
                          <div className="flex justify-between">
                            <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                              Error message
                            </label>
                            <span className="text-sm leading-5 text-gray-500">Optional</span>
                          </div>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                              className={classNames('form-input block w-full sm:text-sm sm:leading-5', {
                                'shadow-outline-red border-red-300': errors.errorMessage,
                              })}
                              placeholder={selected.defaultError}
                              value={values.errorMessage}
                              onChange={handleChange}
                              name="errorMessage"
                            />
                          </div>
                          <p className="text-red-500 transition text-sm pt-0.5">{errors.errorMessage}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Create
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  );
};
