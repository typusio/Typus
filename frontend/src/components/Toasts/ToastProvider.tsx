import React, { useState, useCallback } from 'react';
import { ToastContext } from '../../store/ToastContext';
import { ToastContainer } from './ToastContainer';

export type ToastType = 'error' | 'success';

export interface Toast {
  title: string;
  content?: string;
  errorSubtext?: boolean;
  id: number;
  type: ToastType;
}

let toastCount = 0;
export const ToastProvider = ({ children }: { children: JSX.Element }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (title: string, { content, type, errorSubtext }: Omit<Omit<Toast, 'id'>, 'title'>) => {
      const id = toastCount++;
      const newToast = { title, content, type, id, errorSubtext };

      setToasts(prevToasts => {
        return [...prevToasts, newToast];
      });
    },
    [setToasts],
  );

  const removeToast = useCallback(
    (id: number) => {
      setToasts(prevToasts => {
        return prevToasts.filter(toast => {
          return toast.id !== id;
        });
      });
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastContainer>{children}</ToastContainer>
    </ToastContext.Provider>
  );
};
