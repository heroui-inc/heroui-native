import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { View } from 'react-native';
import { InsetsContainer } from './insets-container';
import { toastReducer } from './reducer';
import type {
  ToasterContextValue,
  ToastId,
  ToastProviderProps,
  ToastShowOptions,
} from './types';

/**
 * Context for toast manager
 */
const ToasterContext = createContext<ToasterContextValue | null>(null);

/**
 * Toast provider component
 * Wraps your app to enable toast functionality
 */
export function ToastProvider({ insets, children }: ToastProviderProps) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const idCounter = useRef(0);

  /**
   * Show a toast
   */
  const show = useCallback((options: ToastShowOptions): ToastId => {
    const id = options.id ?? `toast-${Date.now()}-${idCounter.current++}`;

    dispatch({
      type: 'SHOW',
      payload: {
        id,
        component: options.component,
      },
    });

    return id;
  }, []);

  /**
   * Hide one or more toasts
   */
  const hide = useCallback((ids?: ToastId | ToastId[]) => {
    if (ids === undefined) {
      // Hide all toasts
      dispatch({ type: 'HIDE_ALL' });
    } else {
      // Hide specific toast(s)
      const idsArray = Array.isArray(ids) ? ids : [ids];
      dispatch({
        type: 'HIDE',
        payload: { ids: idsArray },
      });
    }
  }, []);

  const contextValue = useMemo<ToasterContextValue>(
    () => ({
      toast: {
        show,
        hide,
      },
    }),
    [show, hide]
  );

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <InsetsContainer insets={insets}>
        <View className="flex-1">
          {toasts.map((toastItem) => {
            return (
              <Fragment key={toastItem.id}>{toastItem.component}</Fragment>
            );
          })}
        </View>
      </InsetsContainer>
    </ToasterContext.Provider>
  );
}

/**
 * Hook to access toast functionality
 *
 * @returns Toast manager with show and hide methods
 *
 * @example
 * ```tsx
 * const toast = useToast();
 *
 * // Show a toast
 * toast.show({ component: <Toast>Hello</Toast> });
 *
 * // Hide a toast
 * toast.hide('my-toast');
 * ```
 */
export function useToast() {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider provider');
  }

  return context.toast;
}
