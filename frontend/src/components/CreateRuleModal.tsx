import React, { useState, useRef, useContext, useEffect } from 'react';
import { RuleMeta, Rule } from '../util/interfaces';
import { Transition } from '../components/Transition';
import { useFormik } from 'formik';

import classNames from 'classnames';

import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useOutsideClick } from '../util/hooks';
import { API_URL } from '../util/api';
import { FormContext } from '../store/FormContext';

interface Props {
  rules: { [key: string]: RuleMeta };
  onCreate: (rule: Rule) => void;
  onClose: () => void;
  open: boolean;
  strict: boolean;
}

export const CreateRuleModal = ({ rules, onCreate, onClose, open, strict }: Props) => {
  const { form } = useContext(FormContext);

  const defaultRule = strict ? 'canExist' : 'required';

  const [selected, setSelected] = useState<RuleMeta>(rules[defaultRule]);
  const { addToast } = useToasts();

  const findByName = (name: string) => {
    for (const key of Object.keys(rules)) {
      if (rules[key].name == name) return key;
    }

    return defaultRule;
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
    async onSubmit(values) {
      if (validate()) return;

      const res = await fetch(`${API_URL}/validation/${form.id}/rule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field: values.field, validator: findByName(selected.name), detail: values.detail, errorMessage: values.errorMessage }),
        credentials: 'include',
      });

      if (res.status == 400) {
        return addToast(await res.text(), { appearance: 'error', autoDismiss: true });
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

  useEffect(() => {
    setSelected(rules[findByName(defaultRule)]);
  }, [open]);

  return (
    <Transition show={open}>
      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
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
          <form className="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full" ref={modalRef as any}>
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-green-600">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Create new rule</h3>
                  <div className="flex flex-row w-full mt-2">
                    <div className="w-full">
                      <div className="relative flex flex-col mt-1 rounded-md shadow-sm">
                        <div className="relative mt-1 rounded-md shadow-sm">
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
                          value={selected.name}
                          aria-label="Selected tab"
                          className="block w-full py-2 pl-3 pr-10 mt-1 text-base leading-6 transition duration-150 ease-in-out border-gray-300 form-select focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                          onChange={e => setSelected(rules[findByName(e.target.value)])}
                        >
                          {Object.keys(rules)
                            .filter(key => {
                              if (!strict) return rules[key].strictOnly !== true;
                              if (strict) return rules[key].nonStrictOnly !== true;

                              return true;
                            })
                            .map(key => (
                              <option key={key}>{rules[key].name}</option>
                            ))}
                        </select>
                        {selected && selected.requireDetail && (
                          <div>
                            <div className="relative mt-1 rounded-md shadow-sm">
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
                          <div className="relative mt-1 rounded-md shadow-sm">
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
            <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5"
                >
                  Create
                </button>
              </span>
              <span className="flex w-full mt-3 rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
            </div>
          </form>
        </Transition>
      </div>
    </Transition>
  );
};
