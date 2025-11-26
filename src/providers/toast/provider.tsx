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
import { DefaultToast } from '../../components/toast/toast';
import { InsetsContainer } from './insets-container';
import { toastReducer } from './reducer';
import { ToastItemRenderer } from './toast-item-renderer';
import type {
  ToastComponentProps,
  ToasterContextValue,
  ToastProviderProps,
  ToastShowConfig,
  ToastShowOptions,
  ToastShowOptionsWithComponent,
} from './types';

/**
 * Context for toast manager
 */
const ToasterContext = createContext<ToasterContextValue | null>(null);

/**
 * Creates a component function for simple string toast
 */
function createStringToastComponent(
  label: string
): (props: ToastComponentProps) => React.ReactElement {
  return (props: ToastComponentProps) => (
    <DefaultToast {...props} label={label} variant="default" />
  );
}

/**
 * Creates a component function for config-based toast
 */
function createConfigToastComponent(
  config: ToastShowConfig
): (props: ToastComponentProps) => React.ReactElement {
  return (props: ToastComponentProps) => (
    <DefaultToast
      {...props}
      variant={config.variant}
      placement={config.placement}
      duration={config.duration}
      isSwipable={config.isSwipable}
      label={config.label}
      description={config.description}
      actionLabel={config.actionLabel}
      onActionPress={config.onActionPress}
    />
  );
}

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
   * Supports three usage patterns:
   * 1. Simple string: toast.show('This is toast')
   * 2. Config object: toast.show({ label, variant, ... })
   * 3. Custom component: toast.show({ component: (props) => <Toast>...</Toast> })
   */
  const show = useCallback(
    (options: string | ToastShowOptions): string => {
      let normalizedOptions: ToastShowOptionsWithComponent;

      // Case 1: Simple string
      if (typeof options === 'string') {
        normalizedOptions = {
          id: undefined,
          component: createStringToastComponent(options),
        };
      }
      // Case 2: Config object without component
      else if (!('component' in options) || options.component === undefined) {
        const config = options as ToastShowConfig;
        normalizedOptions = {
          id: config.id,
          component: createConfigToastComponent(config),
          onShow: config.onShow,
          onHide: config.onHide,
        };
      }
      // Case 3: Config object with component (existing behavior)
      else {
        normalizedOptions = options as ToastShowOptionsWithComponent;
      }

      const id =
        normalizedOptions.id ?? `toast-${Date.now()}-${idCounter.current++}`;

      dispatch({
        type: 'SHOW',
        payload: {
          id,
          component: normalizedOptions.component,
          onShow: normalizedOptions.onShow,
          onHide: normalizedOptions.onHide,
        },
      });

      total.set((value) => value + 1);

      if (normalizedOptions.onShow) {
        normalizedOptions.onShow();
      }

      return id;
    },
    [total]
  );

  /**
   * Hide one or more toasts
   * - No argument: hides the last toast in the array
   * - "all": hides all toasts
   * - Single ID: hides that toast
   * - Array of IDs: hides those toasts
   */
  const hide = useCallback(
    (ids?: string | string[] | 'all') => {
      if (ids === undefined) {
        // Hide the last toast in the array
        if (toasts.length > 0) {
          const lastToast = toasts[toasts.length - 1];
          if (!lastToast) return;

          if (lastToast.onHide) {
            lastToast.onHide();
          }

          dispatch({
            type: 'HIDE',
            payload: { ids: [lastToast.id] },
          });

          heights.modify(<T extends Record<string, number>>(value: T): T => {
            'worklet';
            const result = { ...value };
            delete result[lastToast.id];
            return result;
          });

          total.set((value) => value - 1);
        }
      } else if (ids === 'all') {
        // Hide all toasts - call onHide for each toast before hiding
        toasts.forEach((toast) => {
          if (toast.onHide) {
            toast.onHide();
          }
        });
        dispatch({ type: 'HIDE_ALL' });
        heights.set({});
        total.set(0);
      } else {
        // Hide specific toast(s) - call onHide for each toast before hiding
        const idsArray = Array.isArray(ids) ? ids : [ids];
        const idsToRemove = idsArray;
        let removedCount = 0;

        // Find and call onHide callbacks before removing
        idsToRemove.forEach((id) => {
          const toast = toasts.find((t) => String(t.id) === String(id));
          if (toast) {
            removedCount++;
            if (toast.onHide) {
              toast.onHide();
            }
          }
        });

        if (removedCount > 0) {
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

          total.set((value) => value - removedCount);
        }
      }
    },
    [total, heights, toasts]
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
