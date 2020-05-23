import { Toast, ToastType } from '../components/Toasts/ToastProvider';
import { createContext, useContext } from 'react';

interface ToastStore {
  toasts: Toast[];
  addToast: (title: string, { content, type, errorSubtext }: Omit<Omit<Toast, 'id'>, 'title'>) => void;
  removeToast: (id: number) => void;
}

export const ToastContext = createContext<ToastStore>({} as ToastStore);

export const useToasts = () => useContext(ToastContext);
