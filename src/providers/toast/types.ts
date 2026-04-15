import type { SharedValue } from 'react-native-reanimated';
import type { ToastRootProps } from '../../components/toast/toast.types';

/**
 * Global toast configuration
 * These values are used as defaults for all toasts unless overridden locally
 */
export interface ToastGlobalConfig
  extends Pick<
    ToastRootProps,
    'variant' | 'placement' | 'isSwipeable' | 'animation'
  > {}

/**
 * Insets for spacing from screen edges
 */
export interface ToastInsets {
  /**
   * Inset from the top edge in pixels (added to safe area inset)
   * @default Platform-specific: iOS = 0, Android = 12
   */
  top?: number;
  /**
   * Inset from the bottom edge in pixels (added to safe area inset)
   * @default Platform-specific: iOS = 6, Android = 12
   */
  bottom?: number;
  /**
   * Inset from the left edge in pixels (added to safe area inset)
   * @default 12
   */
  left?: number;
  /**
   * Inset from the right edge in pixels (added to safe area inset)
   * @default 12
   */
  right?: number;
}

/**
 * Props for the ToastProvider component
 */
export interface ToastProviderProps {
  /**
   * When true, uses a regular View instead of FullWindowOverlay on iOS for toasts.
   * Enables React Native element inspector but toasts won't appear above native modals.
   * @default false
   */
  disableFullWindowOverlay?: boolean;
  /**
   * Controls whether VoiceOver treats the toast overlay window as a modal container.
   * When `false`, VoiceOver can still access elements behind the overlay.
   * When `true`, VoiceOver is restricted to elements inside the overlay.
   * @default false
   * @platform ios
   * @unstable This prop maps directly to the native `accessibilityViewIsModal`
   * on the container view and may change in a future react-native-screens release.
   */
  unstable_accessibilityContainerViewIsModal?: boolean;
  /**
   * Global toast configuration
   * These values are used as defaults for all toasts unless overridden locally
   * Local configs have precedence over global config
   */
  defaultProps?: ToastGlobalConfig;
  /**
   * Insets for spacing from screen edges (added to safe area insets)
   * @default Platform-specific:
   *   - iOS: { top: 0, bottom: 6, left: 12, right: 12 }
   *   - Android: { top: 12, bottom: 12, left: 12, right: 12 }
   */
  insets?: ToastInsets;
  /**
   * Maximum number of visible toasts before opacity starts fading
   * Controls when toast items begin to fade out as they move beyond the visible stack
   * @default 3
   */
  maxVisibleToasts?: number;
  /**
   * Custom wrapper function to wrap the toast content
   * Receives children and should return a component that wraps them
   * The wrapper should apply flex: 1 (via className or style) to ensure proper layout
   * Can be any component wrapper - KeyboardAvoidingView, View, or any custom component
   *
   * @example
   * ```tsx
   * <ToastProvider
   *   contentWrapper={(children) => (
   *     <KeyboardAvoidingView
   *       behavior="padding"
   *       keyboardVerticalOffset={24}
   *       className="flex-1"
   *     >
   *       {children}
   *     </KeyboardAvoidingView>
   *   )}
   * >
   * ```
   */
  contentWrapper?: (children: React.ReactNode) => React.ReactElement;
  /**
   * Children to render
   */
  children?: React.ReactNode;
}

/**
 * Props passed to the toast component function
 */
export interface ToastComponentProps {
  /**
   * The unique ID of the toast
   */
  id: string;
  /**
   * The index of the toast in the array (0-based)
   */
  index: number;
  /**
   * The total number of toasts currently displayed
   */
  total: SharedValue<number>;
  /**
   * Heights of all toast items, keyed by toast ID
   */
  heights: SharedValue<Record<string, number>>;
  /**
   * Maximum number of visible toasts before opacity starts fading
   * Controls when toast items begin to fade out as they move beyond the visible stack
   * @default 3
   */
  maxVisibleToasts?: number;
  /**
   * Show a new toast
   */
  show: (options: string | ToastShowOptions) => string;
  /**
   * Hide one or more toasts
   * - No argument: hides the last toast in the array
   * - "all": hides all toasts
   * - Single ID: hides that toast
   * - Array of IDs: hides those toasts
   */
  hide: (ids?: string | string[] | 'all') => void;
}

/**
 * Configuration for showing a default styled toast (usage pattern 2)
 * Used when component is not provided
 */
export interface ToastShowConfig
  extends Pick<
    ToastRootProps,
    'variant' | 'placement' | 'isSwipeable' | 'animation'
  > {
  /**
   * Duration in milliseconds before the toast automatically disappears
   * Set to `'persistent'` to prevent auto-hide (toast will remain until manually dismissed)
   * @default 4000
   */
  duration?: number | 'persistent';
  /**
   * Optional ID for the toast
   * If not provided, one will be generated automatically
   */
  id?: string;
  /**
   * Label text for the toast
   */
  label?: string;
  /**
   * Description text for the toast
   */
  description?: string;
  /**
   * Action button label text
   */
  actionLabel?: string;
  /**
   * Callback function called when the action button is pressed
   * Receives show and hide functions for programmatic toast control
   */
  onActionPress?: (helpers: {
    show: (options: string | ToastShowOptions) => string;
    hide: (ids?: string | string[] | 'all') => void;
  }) => void;
  /**
   * Icon element to display in the toast
   */
  icon?: React.ReactNode;
  /**
   * Callback function called when the toast is shown
   */
  onShow?: () => void;
  /**
   * Callback function called when the toast is hidden
   */
  onHide?: () => void;
}

/**
 * Options for showing a toast with custom component (usage pattern 3)
 * Used when component is provided
 */
export interface ToastShowOptionsWithComponent {
  /**
   * Optional ID for the toast
   * If not provided, one will be generated automatically
   */
  id?: string;
  /**
   * A function that receives toast props and returns a React element
   */
  component: (props: ToastComponentProps) => React.ReactElement;
  /**
   * Duration in milliseconds before the toast automatically disappears
   * Set to `'persistent'` to prevent auto-hide (toast will remain until manually dismissed)
   * @default 4000
   */
  duration?: number | 'persistent';
  /**
   * Callback function called when the toast is shown
   */
  onShow?: () => void;
  /**
   * Callback function called when the toast is hidden
   */
  onHide?: () => void;
}

/**
 * Conditional type for toast show options
 * - If component is provided: only id, component, onShow, onHide are allowed
 * - If component is NOT provided: all config props are available
 */
export type ToastShowOptions =
  | ToastShowOptionsWithComponent
  | (ToastShowConfig & { component?: never });

/**
 * Represents a single toast item in the state
 */
export interface ToastItem {
  /**
   * Unique identifier for the toast
   */
  id: string;
  /**
   * A function that receives toast props and returns a React element
   */
  component: (props: ToastComponentProps) => React.ReactElement;
  /**
   * Duration in milliseconds before the toast automatically disappears
   * Set to `'persistent'` to prevent auto-hide (toast will remain until manually dismissed)
   * @default 4000
   */
  duration?: number | 'persistent';
  /**
   * Callback function called when the toast is shown
   */
  onShow?: () => void;
  /**
   * Callback function called when the toast is hidden
   */
  onHide?: () => void;
}

/**
 * Actions for the toast reducer
 */
export type ToastAction =
  | { type: 'SHOW'; payload: ToastItem }
  | { type: 'HIDE'; payload: { ids: string[] } }
  | { type: 'HIDE_ALL' };

/**
 * Toast manager API
 */
export interface ToastManager {
  /**
   * Show a toast
   * @param options - Toast configuration options or simple string
   * @returns The ID of the shown toast
   *
   * @example
   * ```tsx
   * const toast = useToast();
   *
   * // Simple string (usage pattern 1)
   * toast.show('This is toast');
   *
   * // Config object with default styling (usage pattern 2)
   * toast.show({
   *   label: 'Success!',
   *   description: 'Your action was completed',
   *   variant: 'success',
   *   actionLabel: 'Undo',
   *   onActionPress: ({ show, hide }) => hide(),
   * });
   *
   * // Custom component (usage pattern 3)
   * toast.show({
   *   component: (props) => <Toast>Hello</Toast>,
   * });
   *
   * // With custom ID
   * toast.show({ id: 'my-toast', component: (props) => <Toast>Hello</Toast> });
   * ```
   */
  show: (options: string | ToastShowOptions) => string;

  /**
   * Hide one or more toasts
   *
   * @param ids - Optional ID(s) of toast(s) to hide
   * - No argument: hides the last toast in the array
   * - "all": hides all toasts
   * - Single ID: hides that toast
   * - Array of IDs: hides those toasts
   *
   * @example
   * ```tsx
   * const toast = useToast();
   *
   * toast.hide();                    // Hide the last toast
   * toast.hide('all');               // Hide all toasts
   * toast.hide('my-toast');          // Hide specific toast
   * toast.hide(['toast-1', 'toast-2']); // Hide multiple toasts
   * ```
   */
  hide: (ids?: string | string[] | 'all') => void;
}

/**
 * Props for the ToastItemRenderer component
 */
export interface ToastItemRendererProps {
  /**
   * The toast item to render
   */
  toastItem: ToastItem;
  /**
   * The index of the toast in the array (0-based)
   */
  index: number;
  /**
   * The total number of toasts currently displayed
   */
  total: SharedValue<number>;
  /**
   * Heights of all toast items, keyed by toast ID
   */
  heights: SharedValue<Record<string, number>>;
  /**
   * Maximum number of visible toasts before opacity starts fading
   * Controls when toast items begin to fade out as they move beyond the visible stack
   * @default 3
   */
  maxVisibleToasts?: number;
  /**
   * Show a new toast
   */
  show: (options: string | ToastShowOptions) => string;
  /**
   * Hide one or more toasts
   * - No argument: hides the last toast in the array
   * - "all": hides all toasts
   * - Single ID: hides that toast
   * - Array of IDs: hides those toasts
   */
  hide: (ids?: string | string[] | 'all') => void;
}

/**
 * Context value for the toast provider
 */
export interface ToasterContextValue {
  toast: ToastManager;
  /**
   * Whether any toast is currently visible
   */
  isToastVisible: boolean;
}
