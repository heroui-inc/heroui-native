import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

  useEffect(() => {
    console.log('🔴 🔴', toasts); // VS remove
  }, [toasts]);

  const safeAreaInsets = useSafeAreaInsets();

  const idCounter = useRef(0);

  const finalInsets = useMemo(() => {
    return {
      top: insets?.top ?? safeAreaInsets.top + 12,
      bottom: insets?.bottom ?? safeAreaInsets.bottom + 12,
      left: insets?.left ?? safeAreaInsets.left + 12,
      right: insets?.right ?? safeAreaInsets.right + 12,
    };
  }, [safeAreaInsets, insets]);

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
      show,
      hide,
    }),
    [show, hide]
  );

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      <View
        className="absolute inset-0 pointer-events-box-none"
        style={{
          paddingTop: finalInsets.top,
          paddingBottom: finalInsets.bottom,
          paddingLeft: finalInsets.left,
          paddingRight: finalInsets.right,
        }}
      >
        <View className="flex-1">
          {toasts.map((toastItem) => {
            return (
              <Fragment key={toastItem.id}>{toastItem.component}</Fragment>
            );
          })}
        </View>
      </View>
    </ToasterContext.Provider>
  );
}

/**
 * Hook to access toast functionality
 *
 * @returns Toast manager with show and hide methods
 *
 */
export function useToast(): ToasterContextValue {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider provider');
  }

  return context;
}
