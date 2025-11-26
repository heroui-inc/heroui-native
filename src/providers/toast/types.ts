import type { SharedValue } from 'react-native-reanimated';

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
   * @default Platform-specific: iOS = 0, Android = 12
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
   * Insets for spacing from screen edges (added to safe area insets)
   * @default Platform-specific:
   *   - iOS: { top: 0, bottom: 0, left: 12, right: 12 }
   *   - Android: { top: 12, bottom: 12, left: 12, right: 12 }
   */
  insets?: ToastInsets;
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
   * Show a new toast
   */
  show: (options: ToastShowOptions) => string;
  /**
   * Hide one or more toasts
   */
  hide: (ids?: string | string[]) => void;
}

/**
 * Options for showing a toast
 */
export interface ToastShowOptions {
  /**
   * Optional ID for the toast
   * If not provided, one will be generated automatically
   */
  id?: string;
  /**
   * A function that receives toast props and returns a React element
   */
  component: (props: ToastComponentProps) => React.ReactElement;
}

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
   * @param options - Toast configuration options
   * @returns The ID of the shown toast
   *
   * @example
   * ```tsx
   * const toast = useToast();
   *
   * // With auto-generated ID
   * toast.show({ component: <Toast>Hello</Toast> });
   *
   * // With custom ID
   * toast.show({ id: 'my-toast', component: <Toast>Hello</Toast> });
   * ```
   */
  show: (options: ToastShowOptions) => string;

  /**
   * Hide one or more toasts
   *
   * @param ids - Optional ID(s) of toast(s) to hide
   * - No argument: hides all toasts
   * - Single ID: hides that toast
   * - Array of IDs: hides those toasts
   *
   * @example
   * ```tsx
   * const toast = useToast();
   *
   * toast.hide();                    // Hide all toasts
   * toast.hide('my-toast');          // Hide specific toast
   * toast.hide(['toast-1', 'toast-2']); // Hide multiple toasts
   * ```
   */
  hide: (ids?: string | string[]) => void;
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
   * Show a new toast
   */
  show: (options: ToastShowOptions) => string;
  /**
   * Hide one or more toasts
   */
  hide: (ids?: string | string[]) => void;
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
