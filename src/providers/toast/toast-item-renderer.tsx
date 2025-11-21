import { memo } from 'react';
import type { ToastId, ToastItem, ToastShowOptions } from './types';

interface ToastItemRendererProps {
  toastItem: ToastItem;
  show: (options: ToastShowOptions) => ToastId;
  hide: (ids?: ToastId | ToastId[]) => void;
}

/**
 * Memoized toast item component to prevent unnecessary re-renders
 * Only re-renders when the toast item itself changes
 */
export const ToastItemRenderer = memo(
  ({ toastItem, show, hide }: ToastItemRendererProps) => {
    const content =
      typeof toastItem.component === 'function'
        ? toastItem.component({ id: toastItem.id, show, hide })
        : toastItem.component;

    return content;
  },
  (prevProps, nextProps) => {
    // Only re-render if the toast ID or component reference changed
    // show and hide are stable references from useCallback, so we don't need to compare them
    return (
      prevProps.toastItem.id === nextProps.toastItem.id &&
      prevProps.toastItem.component === nextProps.toastItem.component
    );
  }
);
