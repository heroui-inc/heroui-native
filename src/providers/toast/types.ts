/**
 * Toast ID type - can be string or number
 */
export type ToastId = string | number;

/**
 * Insets for spacing from screen edges
 */
export interface ToastInsets {
  /**
   * Inset from the top edge in pixels (added to safe area inset)
   * @default 12
   */
  top?: number;
  /**
   * Inset from the bottom edge in pixels (added to safe area inset)
   * @default 12
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
   * @default { top: 12, bottom: 12, left: 12, right: 12 }
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
  id: ToastId;
  /**
   * Show a new toast
   */
  show: (options: ToastShowOptions) => ToastId;
  /**
   * Hide one or more toasts
   */
  hide: (ids?: ToastId | ToastId[]) => void;
}

/**
 * Options for showing a toast
 */
export interface ToastShowOptions {
  /**
   * Optional ID for the toast
   * If not provided, one will be generated automatically
   */
  id?: ToastId;
  /**
   * The React element to render, or a function that receives toast props
   */
  component:
    | React.ReactElement
    | ((props: ToastComponentProps) => React.ReactElement);
}

/**
 * Represents a single toast item in the state
 */
export interface ToastItem {
  /**
   * Unique identifier for the toast
   */
  id: ToastId;
  /**
   * The React element to render, or a function that receives toast props
   */
  component:
    | React.ReactElement
    | ((props: ToastComponentProps) => React.ReactElement);
}

/**
 * Actions for the toast reducer
 */
export type ToastAction =
  | { type: 'SHOW'; payload: ToastItem }
  | { type: 'HIDE'; payload: { ids: ToastId[] } }
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
  show: (options: ToastShowOptions) => ToastId;

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
  hide: (ids?: ToastId | ToastId[]) => void;
}

/**
 * Context value for the toast provider
 */
export interface ToasterContextValue {
  toast: ToastManager;
}
