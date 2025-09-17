import { useCallback } from 'react';
import { getToastContext } from './toaster';

export const useToast = () => {
  const { addToast, dismissToast } = getToastContext();

  const toast = useCallback(
    (options: Parameters<typeof addToast>[0]) => {
      return addToast(options);
    },
    [addToast]
  );

  const dismiss = useCallback(
    (id: string | number) => {
      return dismissToast(id);
    },
    [dismissToast]
  );

  return {
    toast,
    dismiss,
  };
};

