import { memo, useMemo, useState } from 'react';
import { ToastItemContext } from './toast-item.context';
import type { ToastItemRendererProps } from './types';

/**
 * Renders one toast of the stack.
 *
 * The stack position is animated on the UI thread from the shared `stack`
 * value, so a toast does not need to re-render when the toasts around it are
 * shown or dismissed. It re-renders only when:
 * - its item changes,
 * - it moves behind / back into the visible stack (`isBehindStack`), which
 *   re-renders `Toast` alone: the content element is memoized,
 * - its `index` changes, for custom `component` toasts only, which receive
 *   the live `index` as part of `ToastComponentProps`.
 */
export const ToastItemRenderer = memo(
  ({
    toastItem,
    show,
    hide,
    index,
    total,
    heights,
    stack,
    getStack,
    frontDrag,
    timers,
    maxVisibleToasts,
    isBehindStack = false,
  }: ToastItemRendererProps) => {
    if (typeof toastItem.component !== 'function') {
      throw new Error(
        'Toast component must be a function that receives ToastComponentProps'
      );
    }

    const itemContextValue = useMemo(
      () => ({ isBehindStack, stack, getStack, frontDrag, timers }),
      [isBehindStack, stack, getStack, frontDrag, timers]
    );

    /**
     * Library-built toasts do not read `index`; they keep the index they
     * mounted with so position changes do not rebuild their content.
     */
    const [mountIndex] = useState(index);
    const contentIndex = toastItem.isIndexIndependent ? mountIndex : index;

    const content = useMemo(
      () =>
        toastItem.component({
          id: toastItem.id,
          index: contentIndex,
          total,
          heights,
          maxVisibleToasts,
          show,
          hide,
        }),
      [toastItem, contentIndex, total, heights, maxVisibleToasts, show, hide]
    );

    return (
      <ToastItemContext.Provider value={itemContextValue}>
        {content}
      </ToastItemContext.Provider>
    );
  },
  (prevProps, nextProps) =>
    // show, hide, total, heights, stack, getStack, frontDrag and timers are
    // stable references for the lifetime of the provider
    prevProps.toastItem === nextProps.toastItem &&
    prevProps.isBehindStack === nextProps.isBehindStack &&
    prevProps.maxVisibleToasts === nextProps.maxVisibleToasts &&
    (nextProps.toastItem.isIndexIndependent === true ||
      prevProps.index === nextProps.index)
);
