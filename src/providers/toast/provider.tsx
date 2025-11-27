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

const DEFAULT_DURATION = 4000;

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
      isSwipeable={config.isSwipeable}
      label={config.label}
      description={config.description}
      actionLabel={config.actionLabel}
      onActionPress={config.onActionPress}
      icon={config.icon}
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
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const hideRef = useRef<((ids?: string | string[] | 'all') => void) | null>(
    null
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

          // Clear timeout if exists
          const timeout = timeoutRefs.current.get(lastToast.id);
          if (timeout) {
            clearTimeout(timeout);
            timeoutRefs.current.delete(lastToast.id);
          }

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
        // Clear all timeouts
        timeoutRefs.current.forEach((timeout) => {
          clearTimeout(timeout);
        });
        timeoutRefs.current.clear();

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

        // Find and call onHide callbacks before removing, and clear timeouts
        idsToRemove.forEach((id) => {
          // Clear timeout if exists
          const timeout = timeoutRefs.current.get(id);
          if (timeout) {
            clearTimeout(timeout);
            timeoutRefs.current.delete(id);
          }

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

  // Keep hide ref up to date
  hideRef.current = hide;

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
      let duration: number | 'persistent' | undefined = DEFAULT_DURATION; // Default duration
      let explicitId: string | undefined;

      // Case 1: Simple string
      if (typeof options === 'string') {
        normalizedOptions = {
          id: undefined,
          component: createStringToastComponent(options),
          duration: DEFAULT_DURATION,
        };
        duration = DEFAULT_DURATION;
        explicitId = undefined;
      }
      // Case 2: Config object without component
      else if (!('component' in options) || options.component === undefined) {
        const config = options as ToastShowConfig;
        duration = config.duration ?? DEFAULT_DURATION;
        explicitId = config.id;
        normalizedOptions = {
          id: config.id,
          component: createConfigToastComponent(config),
          duration,
          onShow: config.onShow,
          onHide: config.onHide,
        };
      }
      // Case 3: Config object with component (existing behavior)
      else {
        normalizedOptions = options as ToastShowOptionsWithComponent;
        duration = normalizedOptions.duration ?? DEFAULT_DURATION;
        explicitId = normalizedOptions.id;
      }

      const id =
        normalizedOptions.id ?? `toast-${Date.now()}-${idCounter.current++}`;

      // If an explicit ID was provided, check if a toast with that ID already exists
      // If it exists, skip adding a new toast and return the existing ID
      if (explicitId !== undefined) {
        const existingToast = toasts.find(
          (toast) => String(toast.id) === String(explicitId)
        );
        if (existingToast) {
          return existingToast.id;
        }
      }

      dispatch({
        type: 'SHOW',
        payload: {
          id,
          component: normalizedOptions.component,
          duration,
          onShow: normalizedOptions.onShow,
          onHide: normalizedOptions.onHide,
        },
      });

      total.set((value) => value + 1);

      if (normalizedOptions.onShow) {
        normalizedOptions.onShow();
      }

      // Set up auto-dismiss timeout synchronously
      if (
        duration !== 'persistent' &&
        typeof duration === 'number' &&
        !isNaN(duration) &&
        duration > 0 &&
        duration !== Infinity
      ) {
        // Handle immediate dismissal
        if (duration === 0) {
          if (hideRef.current) {
            hideRef.current(id);
          }
        } else {
          const timeout = setTimeout(() => {
            if (hideRef.current) {
              hideRef.current(id);
            }
            timeoutRefs.current.delete(id);
          }, duration);
          timeoutRefs.current.set(id, timeout);
        }
      }

      return id;
    },
    [total, toasts]
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
