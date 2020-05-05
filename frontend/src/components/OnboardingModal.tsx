import React, { useRef } from 'react';
import { Transition } from './Transition';
import { useOutsideClick } from '../util/hooks';
import { DOCS_URL } from '../util/api';

interface Props {
  onClose: () => void;
  open: boolean;
}

export const OnboardingModal = ({ open, onClose }: Props) => {
  const modalRef = useRef();

  useOutsideClick(modalRef, () => {
    onClose();
  });

  return (
    <Transition show={open}>
      <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center z-50">
        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
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
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
            <img
              src="https://www.vippng.com/png/full/87-878209_confetti-png-transparent-images-transparent-background-clipart-confetti.png"
              className="absolute w-full h-full top-0 right-0"
              style={{ zIndex: -1, opacity: 0.1 }}
            />
            <div>
              <div className="mx-auto flex items-center justify-center h-20 w-20">
                <img src="https://images.emojiterra.com/mozilla/512px/1f389.png" alt="" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Welcome to Typus!</h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">Would you like to see how to integrate your form with us?</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense z-10">
              <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
                <button
                  type="button"
                  onClick={() => {
                    window.open(`${DOCS_URL}/getting-started/setup`);
                    onClose();
                  }}
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Let's go!
                </button>
              </span>
              <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Skip
                </button>
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  );
};
