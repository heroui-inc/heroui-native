import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { InsetsContainer } from './insets-container';
import { toastReducer } from './reducer';
import { ToastItemRenderer } from './toast-item-renderer';
import type {
  ToasterContextValue,
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
export function ToastProvider({
  insets,
  maxVisibleToasts = 3,
  children,
}: ToastProviderProps) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const isToastVisible = toasts.length > 0;

  const heights = useSharedValue<Record<string, number>>({});

  const total = useSharedValue<number>(0);

  const idCounter = useRef(0);

  /**
   * Show a toast
   */
  const show = useCallback(
    (options: ToastShowOptions): string => {
      const id = options.id ?? `toast-${Date.now()}-${idCounter.current++}`;

      dispatch({
        type: 'SHOW',
        payload: {
          id,
          component: options.component,
        },
      });

      total.set((value) => value + 1);

      return id;
    },
    [total]
  );

  /**
   * Hide one or more toasts
   */
  const hide = useCallback(
    (ids?: string | string[]) => {
      if (ids === undefined) {
        // Hide all toasts
        dispatch({ type: 'HIDE_ALL' });
        heights.set({});
        total.set(0);
      } else {
        // Hide specific toast(s)
        const idsArray = Array.isArray(ids) ? ids : [ids];
        const idsToRemove = idsArray;
        dispatch({
          type: 'HIDE',
          payload: { ids: idsArray },
        });

        heights.modify(<T extends Record<string, number>>(value: T): T => {
          'worklet';
          const result = { ...value };
          for (const id of idsToRemove) {
            delete result[id];
          }
          return result;
        });

        total.set((value) => value - 1);
      }
    },
    [total, heights]
  );

  const contextValue = useMemo<ToasterContextValue>(
    () => ({
      toast: {
        show,
        hide,
      },
      isToastVisible,
    }),
    [show, hide, isToastVisible]
  );

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <InsetsContainer insets={insets}>
        <View className="flex-1">
          {toasts.map((toastItem, index) => (
            <ToastItemRenderer
              key={toastItem.id}
              toastItem={toastItem}
              show={show}
              hide={hide}
              index={index}
              total={total}
              heights={heights}
              maxVisibleToasts={maxVisibleToasts}
            />
          ))}
        </View>
      </InsetsContainer>
    </ToasterContext.Provider>
  );
}

/**
 * Hook to access toast functionality
 *
 * @returns Object containing toast manager and visibility state
 *
 * @example
 * ```tsx
 * const { toast, isToastVisible } = useToast();
 *
 * // Show a toast
 * toast.show({ component: <Toast>Hello</Toast> });
 *
 * // Hide a toast
 * toast.hide('my-toast');
 *
 * // Check if any toast is visible
 * if (isToastVisible) {
 *   console.log('A toast is currently displayed');
 * }
 * ```
 */
export function useToast() {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider provider');
  }

  return {
    toast: context.toast,
    isToastVisible: context.isToastVisible,
  };
}
