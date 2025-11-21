import { memo } from 'react';
import type { ToastItem } from './types';

/**
 * Memoized toast item component to prevent unnecessary re-renders
 * Only re-renders when the toast item itself changes
 */
export const ToastItemRenderer = memo(
  ({ toastItem }: { toastItem: ToastItem }) => {
    const content =
      typeof toastItem.component === 'function'
        ? toastItem.component({ id: toastItem.id })
        : toastItem.component;

    return content;
  },
  (prevProps, nextProps) => {
    // Only re-render if the toast ID or component reference changed
    return (
      prevProps.toastItem.id === nextProps.toastItem.id &&
      prevProps.toastItem.component === nextProps.toastItem.component
    );
  }
);
