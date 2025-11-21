import { memo } from 'react';
import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { ToastId, ToastItem, ToastShowOptions } from './types';

interface ToastItemRendererProps {
  toastItem: ToastItem;
  show: (options: ToastShowOptions) => ToastId;
  hide: (ids?: ToastId | ToastId[]) => void;
  isLast: boolean;
  toastHeight: SharedValue<number>;
}

/**
 * Memoized toast item component to prevent unnecessary re-renders
 * Only re-renders when the toast item itself changes
 */
export const ToastItemRenderer = memo(
  ({ toastItem, show, hide, isLast, toastHeight }: ToastItemRendererProps) => {
    if (typeof toastItem.component !== 'function') {
      throw new Error(
        'Toast component must be a function that receives ToastComponentProps'
      );
    }

    const content = toastItem.component({
      id: toastItem.id,
      toastHeight: toastHeight.value,
      show,
      hide,
    });

    return (
      <View
        onLayout={(event) => {
          if (isLast) {
            toastHeight.set(event.nativeEvent.layout.height);
          }
        }}
      >
        {content}
      </View>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if the toast ID, component reference, or isLast changed
    // show, hide, and toastHeight are stable references, so we don't need to compare them
    return (
      prevProps.toastItem.id === nextProps.toastItem.id &&
      prevProps.toastItem.component === nextProps.toastItem.component &&
      prevProps.isLast === nextProps.isLast
    );
  }
);
