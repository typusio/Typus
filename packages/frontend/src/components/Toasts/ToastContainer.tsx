import React from 'react';
import { useToasts } from '../../store/ToastContext';
import { Toast } from './Toast';

export const ToastContainer = ({ children }: { children: JSX.Element }) => {
  const { toasts } = useToasts();

  return (
    <>
      {children}

      <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
        {toasts.map(toast => {
          return <Toast key={toast.id} toast={toast} />;
        })}
      </div>
    </>
  );
};
