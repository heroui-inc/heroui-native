import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultToast } from '../../components/toast/toast';
import { InsetsContainer } from './insets-container';
import { toastReducer } from './reducer';
import { ToastConfigContext } from './toast-config.context';
import { ToastItemRenderer } from './toast-item-renderer';
import type {
  ToastComponentProps,
  ToasterContextValue,
  ToastGlobalConfig,
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
 * Merges global config with local config, ensuring local config takes precedence
 * Only includes defined values from localConfig to avoid overriding global config with undefined
 */
function mergeToastConfig(
  globalConfig: ToastGlobalConfig | undefined,
  localConfig: Partial<ToastGlobalConfig>
): Partial<ToastGlobalConfig> {
  const result: Partial<ToastGlobalConfig> = { ...globalConfig };

  // Only override with defined values from localConfig
  if (localConfig.variant !== undefined) {
    result.variant = localConfig.variant;
  }
  if (localConfig.placement !== undefined) {
    result.placement = localConfig.placement;
  }
  if (localConfig.isSwipeable !== undefined) {
    result.isSwipeable = localConfig.isSwipeable;
  }
  if (localConfig.animation !== undefined) {
    result.animation = localConfig.animation;
  }

  return result;
}

/**
 * Creates a component function for simple string toast
 */
function createStringToastComponent(
  label: string,
  globalConfig: ToastGlobalConfig | undefined
): (props: ToastComponentProps) => React.ReactElement {
  return (props: ToastComponentProps) => {
    const mergedConfig = mergeToastConfig(globalConfig, {
      variant: 'default',
    });
    return (
      <DefaultToast
        {...props}
        label={label}
        variant={mergedConfig.variant}
        placement={mergedConfig.placement}
        isSwipeable={mergedConfig.isSwipeable}
        animation={mergedConfig.animation}
      />
    );
  };
}

/**
 * Creates a component function for config-based toast
 */
function createConfigToastComponent(
  config: ToastShowConfig,
  globalConfig: ToastGlobalConfig | undefined
): (props: ToastComponentProps) => React.ReactElement {
  return (props: ToastComponentProps) => {
    const mergedConfig = mergeToastConfig(globalConfig, {
      variant: config.variant,
      placement: config.placement,
      isSwipeable: config.isSwipeable,
      animation: config.animation,
    });
    return (
      <DefaultToast
        {...props}
        variant={mergedConfig.variant}
        placement={mergedConfig.placement}
        isSwipeable={mergedConfig.isSwipeable}
        animation={mergedConfig.animation}
        label={config.label}
        description={config.description}
        actionLabel={config.actionLabel}
        onActionPress={config.onActionPress}
        icon={config.icon}
      />
    );
  };
}

/**
 * Toast provider component
 * Wraps your app to enable toast functionality
 */
export function ToastProvider({
  defaultProps,
  insets,
  maxVisibleToasts = 3,
  contentWrapper,
  children,
  disableFullWindowOverlay = false,
  unstable_accessibilityContainerViewIsModal,
}: ToastProviderProps) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  /**
   * Memoize global config to prevent unnecessary re-renders
   */
  const globalConfig = useMemo<ToastGlobalConfig | undefined>(
    () => defaultProps,
    [defaultProps]
  );

  const isToastVisible = toasts.length > 0;

  const heights = useSharedValue<Record<string, number>>({});

  const total = useSharedValue<number>(0);

  /**
   * Derive total from toasts.length so the animated opacity/scale/translateY
   * interpolations always use the real count.  Manual increment/decrement
   * was prone to drift when hide + show ran in the same tick or when
   * auto-dismiss raced with a manual hide (stale-closure mismatch).
   */
  useEffect(() => {
    total.set(toasts.length);
  }, [toasts.length, total]);

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
        }
      }
    },
    [heights, toasts]
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
          component: createStringToastComponent(options, globalConfig),
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
          component: createConfigToastComponent(config, globalConfig),
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
    [toasts, globalConfig]
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
    <ToastConfigContext.Provider value={globalConfig}>
      <ToasterContext.Provider value={contextValue}>
        {children}
        {toasts.length > 0 && (
          <InsetsContainer
            insets={insets}
            contentWrapper={contentWrapper}
            disableFullWindowOverlay={disableFullWindowOverlay}
            unstable_accessibilityContainerViewIsModal={
              unstable_accessibilityContainerViewIsModal
            }
          >
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
        )}
      </ToasterContext.Provider>
    </ToastConfigContext.Provider>
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
