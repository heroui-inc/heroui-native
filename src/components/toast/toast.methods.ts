import type { ToastProps } from './toast.types';
import { getToastContext } from './toaster';

export const toast = (title: string, options: Omit<ToastProps, 'id'>) => {
  return getToastContext().addToast({
    title,
    variant: 'default',
    ...options,
  });
};

toast.success = (title: string, options = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'success',
  });
};

toast.error = (title: string, options = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'danger',
  });
};

toast.warning = (title: string, options = {}) => {
  return getToastContext().addToast({
    ...options,
    title,
    variant: 'warning',
  });
};

toast.promise = <T>(promise: Promise<T>, options: any) => {
  return getToastContext().addToast({
    ...options,
    title: options.loading,
    variant: 'default',
    promiseOptions: {
      ...options,
      promise,
    },
  });
};

toast.custom = (jsx: React.ReactNode, options: any) => {
  return getToastContext().addToast({
    title: '',
    variant: 'default',
    jsx,
    ...options,
  });
};

toast.loading = (title: string, options = {}) => {
  return getToastContext().addToast({
    title,
    variant: 'default',
    ...options,
  });
};

toast.dismiss = (id: string | number) => {
  return getToastContext().dismissToast(id);
};
