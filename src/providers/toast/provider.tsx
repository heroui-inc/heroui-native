import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { scheduleOnUI } from 'react-native-worklets';
import { DefaultToast } from '../../components/toast/toast';
import { InsetsContainer } from './insets-container';
import { ToastConfigContext } from './toast-config.context';
import { ToastItemRenderer } from './toast-item-renderer';
import type { ToastItemContextValue } from './toast-item.context';
import {
  DEFAULT_TOAST_DURATION,
  ToastStore,
  type ToastStackState,
  type ToastStoreEntry,
} from './toast-store';
import type {
  ToastComponentProps,
  ToasterContextValue,
  ToastGlobalConfig,
  ToastProviderProps,
  ToastShowConfig,
  ToastShowOptions,
  ToastShowOptionsWithComponent,
} from './types';

/**
 * How long the overlay stays mounted after the last toast is hidden, so the
 * exit animation can finish and a burst of toasts does not recreate the
 * native overlay window for every toast.
 */
const OVERLAY_UNMOUNT_DELAY = 400;

/**
 * Context for the toast manager. Its value never changes after mount, so
 * calling `toast.show()` / `toast.hide()` never re-renders `useToast()`
 * consumers through it.
 */
const ToasterContext = createContext<{
  toast: ToasterContextValue['toast'];
  store: ToastStore;
} | null>(null);

// --------------------------------------------------

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
 * Normalizes the three `toast.show()` call forms into a store entry
 * 1. Simple string: toast.show('This is toast')
 * 2. Config object: toast.show({ label, variant, ... })
 * 3. Custom component: toast.show({ component: (props) => <Toast>...</Toast> })
 */
function toStoreEntry(
  options: string | ToastShowOptions,
  globalConfig: ToastGlobalConfig | undefined
): ToastStoreEntry {
  if (typeof options === 'string') {
    return {
      component: createStringToastComponent(options, globalConfig),
      duration: DEFAULT_TOAST_DURATION,
      isIndexIndependent: true,
    };
  }

  if (!('component' in options) || options.component === undefined) {
    const config = options as ToastShowConfig;
    return {
      id: config.id,
      component: createConfigToastComponent(config, globalConfig),
      duration: config.duration ?? DEFAULT_TOAST_DURATION,
      onShow: config.onShow,
      onHide: config.onHide,
      isIndexIndependent: true,
    };
  }

  const withComponent = options as ToastShowOptionsWithComponent;
  return {
    id: withComponent.id,
    component: withComponent.component,
    duration: withComponent.duration ?? DEFAULT_TOAST_DURATION,
    onShow: withComponent.onShow,
    onHide: withComponent.onHide,
  };
}

// --------------------------------------------------

/**
 * Toast provider component
 * Wraps your app to enable toast functionality
 *
 * State lives in a `ToastStore` (one per provider) read through
 * `useSyncExternalStore`. The stack layout (count, positions, front toast)
 * is mirrored into a shared value so every stack animation runs on the UI
 * thread: showing or hiding a toast mounts or unmounts only that toast.
 */
export function ToastProvider({
  defaultProps,
  insets,
  maxVisibleToasts = 3,
  maxToasts,
  contentWrapper,
  children,
  disableFullWindowOverlay = false,
  unstable_accessibilityContainerViewIsModal,
}: ToastProviderProps) {
  const [store] = useState(() => new ToastStore());

  /**
   * Assigned during render (idempotent) so a `show()` from a child's mount
   * effect already respects the limit
   */
  store.setMaxToasts(maxToasts);

  useEffect(() => store.dispose, [store]);

  const { toasts } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );

  /**
   * Memoize global config to prevent unnecessary re-renders
   */
  const globalConfig = useMemo<ToastGlobalConfig | undefined>(
    () => defaultProps,
    [defaultProps]
  );

  const globalConfigRef = useRef(globalConfig);
  globalConfigRef.current = globalConfig;

  /**
   * Natural (unconstrained) height of every toast, keyed by toast ID
   */
  const heights = useSharedValue<Record<string, number>>({});

  /**
   * Number of toasts; kept for `ToastComponentProps.total`
   */
  const total = useSharedValue<number>(0);

  /**
   * Stack layout read by the animated styles on the UI thread
   */
  const stack = useSharedValue<ToastStackState>(store.getStack());

  /**
   * `1` while the front toast is dragged. The toasts behind it clear their
   * full cover during the drag so the next toast is readable as the front one
   * is swiped away. Reset whenever the stack changes, e.g. after a swipe
   * dismissal removed the dragged toast.
   */
  const frontDrag = useSharedValue(0);

  /**
   * Pushes every list change to the UI thread as one scheduled task, sent
   * before React re-renders: the stack layout, the count, the end of any
   * front-toast drag, and the heights of removed toasts (dropped in the same
   * pass). A toast that mounts before the task has run reads the same layout
   * from the store snapshot (`getStack`).
   */
  useLayoutEffect(
    () =>
      store.subscribeStack((nextStack) => {
        // The snapshot is copied to the UI thread once per change
        scheduleOnUI((uiStack: ToastStackState) => {
          'worklet';
          stack.set(uiStack);
          frontDrag.set(0);
          total.set(uiStack.total);
          const { positions } = uiStack;
          heights.modify((value) => {
            'worklet';
            let next: Record<string, number> | undefined;
            for (const id in value) {
              if (positions[id] === undefined) {
                if (!next) next = { ...value };
                delete next[id];
              }
            }
            return (next ?? value) as typeof value;
          }, false);
        }, nextStack);
      }),
    [store, stack, total, heights, frontDrag]
  );

  const show = useCallback(
    (options: string | ToastShowOptions): string =>
      store.add(toStoreEntry(options, globalConfigRef.current)),
    [store]
  );

  const hide = store.remove;

  const contextValue = useMemo(
    () => ({ toast: { show, hide }, store }),
    [show, hide, store]
  );

  const timers = useMemo<ToastItemContextValue['timers']>(
    () => ({ pause: store.pauseTimer, resume: store.resumeTimer }),
    [store]
  );

  /**
   * The overlay mounts with the first toast and unmounts a moment after the
   * last one, once its exit animation has played.
   */
  const hasToasts = toasts.length > 0;
  const [isOverlayMounted, setIsOverlayMounted] = useState(hasToasts);
  if (hasToasts && !isOverlayMounted) {
    setIsOverlayMounted(true);
  }

  useEffect(() => {
    if (hasToasts || !isOverlayMounted) return;
    const timeout = setTimeout(
      () => setIsOverlayMounted(false),
      OVERLAY_UNMOUNT_DELAY
    );
    return () => clearTimeout(timeout);
  }, [hasToasts, isOverlayMounted]);

  /**
   * Only the visible stack plus the one toast fading out behind it are
   * mounted. Toasts further back are fully transparent; they stay in the
   * store with their auto-dismiss timers and mount again (without an
   * entering animation) once toasts in front of them are dismissed.
   */
  const firstVisibleIndex = toasts.length - maxVisibleToasts;
  const firstMountedIndex = Math.max(0, firstVisibleIndex - 1);

  return (
    <ToastConfigContext.Provider value={globalConfig}>
      <ToasterContext.Provider value={contextValue}>
        {children}
        {isOverlayMounted && (
          <InsetsContainer
            insets={insets}
            contentWrapper={contentWrapper}
            disableFullWindowOverlay={disableFullWindowOverlay}
            unstable_accessibilityContainerViewIsModal={
              unstable_accessibilityContainerViewIsModal
            }
          >
            <View className="flex-1">
              {toasts.slice(firstMountedIndex).map((toastItem, offset) => {
                const index = firstMountedIndex + offset;
                return (
                  <ToastItemRenderer
                    key={toastItem.id}
                    toastItem={toastItem}
                    show={show}
                    hide={hide}
                    index={index}
                    total={total}
                    heights={heights}
                    stack={stack}
                    getStack={store.getStack}
                    frontDrag={frontDrag}
                    timers={timers}
                    maxVisibleToasts={maxVisibleToasts}
                    isBehindStack={index < firstVisibleIndex}
                  />
                );
              })}
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
export function useToast(): ToasterContextValue {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider provider');
  }

  const { toast, store } = context;

  const [, forceRender] = useReducer((count: number) => count + 1, 0);

  /**
   * Whether this component read `isToastVisible`, and the value it read.
   * Only components that read it re-render when it changes, so components
   * that only call `toast.show()` / `toast.hide()` never re-render when the
   * first toast appears or the last one leaves.
   */
  const isVisibilityReadRef = useRef(false);
  const renderedVisibilityRef = useRef(false);

  useEffect(() => {
    const onChange = () => {
      if (
        isVisibilityReadRef.current &&
        store.getSnapshot().toasts.length > 0 !== renderedVisibilityRef.current
      ) {
        forceRender();
      }
    };
    const unsubscribe = store.subscribe(onChange);
    // Catch a change that happened between render and subscription
    onChange();
    return unsubscribe;
  }, [store]);

  return {
    toast,
    // A getter, so reading the value subscribes this component to its changes
    get isToastVisible() {
      const value = store.getSnapshot().toasts.length > 0;
      isVisibilityReadRef.current = true;
      renderedVisibilityRef.current = value;
      return value;
    },
  };
}
