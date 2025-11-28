import { memo } from 'react';
import type { ToastItemRendererProps } from './types';

/**
 * Memoized toast item component to prevent unnecessary re-renders
 * Only re-renders when the toast item itself changes
 */
export const ToastItemRenderer = memo(
  ({
    toastItem,
    show,
    hide,
    index,
    total,
    heights,
    maxVisibleToasts,
  }: ToastItemRendererProps) => {
    if (typeof toastItem.component !== 'function') {
      throw new Error(
        'Toast component must be a function that receives ToastComponentProps'
      );
    }

    const content = toastItem.component({
      id: toastItem.id,
      index,
      total,
      heights,
      maxVisibleToasts,
      show,
      hide,
    });

    return content;
  },
  (prevProps, nextProps) => {
    // Only re-render if the toast ID, component reference, or index changed
    // show, hide, total, and heights are stable references, so we don't need to compare them
    return (
      prevProps.toastItem.id === nextProps.toastItem.id &&
      prevProps.toastItem.component === nextProps.toastItem.component &&
      prevProps.index === nextProps.index
    );
  }
);
