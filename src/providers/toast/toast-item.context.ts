import { createContext, useContext } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import type { ToastStackState } from './toast-store';
import type { ToastTimerControls } from './types';

/**
 * Per-item state the toast provider hands to the toast it renders.
 * Kept out of `ToastComponentProps` because custom toast components spread
 * those props onto `Toast` and this state is an internal rendering detail.
 */
export interface ToastItemContextValue {
  /**
   * Whether the toast sits behind the visible stack (`index` is beyond
   * `maxVisibleToasts`), where it is fully transparent. Such a toast mounts
   * and unmounts without its entering / exiting layout animation, so it never
   * flashes into view while it is hidden.
   */
  isBehindStack: boolean;
  /**
   * Stack layout (count, positions, front toast) read on the UI thread.
   * Undefined when a `Toast` is rendered outside the provider; the `index`
   * and `total` props are used then.
   */
  stack?: SharedValue<ToastStackState>;
  /**
   * Reads the stack layout on the JS thread. The first run of an animated
   * style happens on the JS thread at mount; reading `stack` there would
   * block on a synchronous call to the UI thread.
   */
  getStack?: () => ToastStackState;
  /**
   * `1` while the front toast is dragged. The toasts behind it clear their
   * full cover during the drag so the next toast is readable as the front one
   * is swiped away.
   */
  frontDrag?: SharedValue<number>;
  /**
   * Pauses / resumes the auto-dismiss timer, e.g. while the toast is dragged
   */
  timers?: ToastTimerControls;
}

const ToastItemContext = createContext<ToastItemContextValue>({
  isBehindStack: false,
});

/**
 * Reads the per-item state of the toast currently rendered by the provider.
 */
export function useToastItem(): ToastItemContextValue {
  return useContext(ToastItemContext);
}

export { ToastItemContext };
