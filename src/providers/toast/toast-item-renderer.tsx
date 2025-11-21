import { memo } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { ToastId, ToastItem, ToastShowOptions } from './types';

interface ToastItemRendererProps {
  toastItem: ToastItem;
  index: number;
  total: number;
  height: SharedValue<number>;
  show: (options: ToastShowOptions) => ToastId;
  hide: (ids?: ToastId | ToastId[]) => void;
}

/**
 * Memoized toast item component to prevent unnecessary re-renders
 * Only re-renders when the toast item itself changes
 */
export const ToastItemRenderer = memo(
  ({ toastItem, show, hide, index, total, height }: ToastItemRendererProps) => {
    if (typeof toastItem.component !== 'function') {
      throw new Error(
        'Toast component must be a function that receives ToastComponentProps'
      );
    }

    const content = toastItem.component({
      id: toastItem.id,
      index,
      total,
      height,
      show,
      hide,
    });

    return content;
  },
  (prevProps, nextProps) => {
    // Only re-render if the toast ID, component reference, index, or total changed
    // show, hide, and height are stable references, so we don't need to compare them
    return (
      prevProps.toastItem.id === nextProps.toastItem.id &&
      prevProps.toastItem.component === nextProps.toastItem.component &&
      prevProps.index === nextProps.index &&
      prevProps.total === nextProps.total
    );
  }
);
