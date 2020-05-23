import React, { useRef, useContext } from 'react';
import { User } from '../util/interfaces';
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL } from '../api/api';
import { Transition } from './Transition';
import { FormContext } from '../store/FormContext';
import { useToasts } from '../store/ToastContext';
import { useClickAway } from 'react-use';

interface Props {
  onClose: () => void;
  onAdd: (user: User) => void;
  open: boolean;
}

export const AddCollaboratorModal = ({ onClose, onAdd, open }: Props) => {
  const { form } = useContext(FormContext);

  const { addToast } = useToasts();

  const modalRef = useRef(null);
  useClickAway(modalRef, () => onClose());

  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email cannot be empty').email('Email must be a valid email'),
    }),
    async onSubmit(values) {
      const res = await fetch(`${API_URL}/collaborator/${form.id}`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        method: 'POST',
        credentials: 'include',
      });

      if (res.status == 400) return addToast('This user is already a collaborator', { type: 'error' });
      if (res.status == 404) return addToast('No user could be found with this email', { type: 'error' });

      addToast('User successfully added', { type: 'success' });

      return onAdd(await res.json());
    },
    validateOnChange: false,
  });

  return (
    <Transition show={open}>
      <div className="fixed inset-x-0 bottom-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
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
          <form className="overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full" ref={modalRef}>
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-blue-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-blue-600"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Add new collaborator</h3>

                  <div className="flex flex-row w-full mt-2">
                    <div className="w-full">
                      <div className="relative flex flex-col mt-1 rounded-md shadow-sm">
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <input
                            className={classNames('form-input block w-full sm:text-sm sm:leading-5', { 'shadow-outline-red border-red-300': errors.email })}
                            placeholder="Collaborator's email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </div>
                        <p className="text-red-500 transition text-sm pt-0.5">{errors.email}</p>
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
                  Add
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
