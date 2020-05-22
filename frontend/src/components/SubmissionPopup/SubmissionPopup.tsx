import React, { useRef, MutableRefObject, useState, useEffect, useContext, useMemo } from 'react';
import { Submission } from '../../util/interfaces';
import { useOutsideClick } from '../../util/hooks';
import { PopupNote } from './PopupNote';
import { PopupUser } from './PopupUser';
import { API_URL } from '../../util/api';
import { Transition } from '../Transition';
import { PopupInfo } from './PopupInfo';
import { FormContext } from '../../store/FormContext';

interface Props {
  submissionId: number;
  onClose: () => void;
  onRemove: () => void;
  open: boolean;
}

export const SubmissionPopup = ({ submissionId, onClose, onRemove, open }: Props) => {
  const { form } = useContext(FormContext);

  const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const [submission, setSubmission] = useState<Submission>();

  const parsed = useMemo(() => JSON.parse(submission ? submission.data : '{}'), [submission]);

  useEffect(() => {
    async function fetchSubmission() {
      const data = await fetch(`${API_URL}/${form.id}/${submissionId}`, { credentials: 'include' }).then(res => res.json());

      setSubmission(data);
    }

    if (submissionId !== 0) fetchSubmission();
  }, [submissionId]);

  const popupRef = useRef();

  useOutsideClick(popupRef, () => onClose());

  async function deleteSubmission() {
    await fetch(`${API_URL}/${submission!.form.id}/submissions`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ submissions: [submission!.id] }),
      credentials: 'include',
    });

    onRemove();
  }

  async function markAsSpam() {
    const data = await fetch(`${API_URL}/${submission!.form.id}/${submission!.id}/spam`, { method: 'PUT', credentials: 'include' }).then(res => res.text());

    if (data == 'spam_removed') {
      return setSubmission({ ...submission!, spam: false });
    }

    return setSubmission({ ...submission!, spam: true });
  }

  return (
    <Transition show={open}>
      <div className="fixed inset-x-0 top-0 z-50 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center" style={{ height: '90vh' }}>
        {submission && (
          <Transition
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="z-50 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl" ref={popupRef as any}>
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Submission Information</h3>
                <p className="max-w-2xl mt-1 text-sm leading-5 text-gray-500">id #{submission.id}</p>
              </div>
              <div>
                <dl>
                  <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium leading-5 text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">Margot Foster</dd>
                  </div>
                  <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium leading-5 text-gray-500">Application for</dt>
                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">Backend Developer</dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium leading-5 text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">margotfoster@example.com</dd>
                  </div>
                  <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium leading-5 text-gray-500">Salary expectation</dt>
                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">$120,000</dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium leading-5 text-gray-500">About</dt>
                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint.
                      Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium leading-5 text-gray-500">Attachments</dt>
                    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="border border-gray-200 rounded-md">
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm leading-5">
                          <div className="flex items-center flex-1 w-0">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="flex-1 w-0 ml-2 truncate">resume_back_end_developer.pdf</span>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <a href="/" className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500">
                              Download
                            </a>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm leading-5 border-t border-gray-200">
                          <div className="flex items-center flex-1 w-0">
                            <svg className="flex-shrink-0 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="flex-1 w-0 ml-2 truncate">coverletter_back_end_developer.pdf</span>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <a href="/" className="font-medium text-indigo-600 transition duration-150 ease-in-out hover:text-indigo-500">
                              Download
                            </a>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Transition>
        )}
      </div>
    </Transition>
  );
};
