import React, { useState, useEffect } from 'react';
import { useToasts } from '../../store/ToastContext';
import { Transition } from '../Transition';
import classNames from 'classnames';
import { useTimeoutFn } from 'react-use';
import { Toast as ToastType } from './ToastProvider';

export const Toast = ({ toast }: { toast: ToastType }) => {
  const { removeToast } = useToasts();
  const [show, setShow] = useState(true);

  const hide = () => {
    if (timedOut() === false) {
      cancelTimeout();
    }

    setShow(false);
  };

  const [timedOut, cancelTimeout, resetTimeout] = useTimeoutFn(hide, 5000);

  useEffect(() => {
    return () => {
      if (show == false) {
        removeToast(toast.id);
      }
    };
  });

  return (
    <Transition
      appear={true}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={show}
    >
      <div
        className="w-full max-w-sm bg-white rounded-lg shadow-lg pointer-events-auto"
        onMouseEnter={() => cancelTimeout()}
        onMouseLeave={() => resetTimeout()}
      >
        <div className="overflow-hidden rounded-lg shadow-xs">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className={classNames('w-6 h-6', { 'text-green-400': toast.type == 'success', 'text-red-600': toast.type == 'error' })}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {toast.type == 'success' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {toast.type == 'error' && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  )}
                </svg>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium leading-5 text-gray-900">{toast.title}</p>
                {(toast.content || toast.errorSubtext) && (
                  <p className="mt-1 text-sm leading-5 text-gray-500">{toast.content ? toast.content : 'If this problem persists, please contact support.'}</p>
                )}
              </div>
              <div className="flex flex-shrink-0 ml-4">
                <button
                  className="inline-flex text-gray-400 transition duration-150 ease-in-out focus:outline-none focus:text-gray-500"
                  onClick={() => setShow(false)}
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
