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
 * Options for preparing a toast
 */
export interface ToastPrepareOptions {
  /**
   * Function that returns the React element to render
   * The function receives the toast ID as a parameter
   */
  component: (id: string) => React.ReactElement;
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
   * Function that returns the React element to render
   */
  component: (id: string) => React.ReactElement;
  /**
   * Whether the toast is currently visible
   */
  visible: boolean;
}

/**
 * Actions for the toast reducer
 */
export type ToastAction =
  | { type: 'ADD'; payload: ToastItem }
  | { type: 'UPDATE'; payload: { id: string; visible: boolean } }
  | { type: 'REMOVE'; payload: { id: string } };

/**
 * Context value for the Toaster provider
 */
export interface ToasterContextValue {
  /**
   * Prepare a toast for later display
   * @param options - Options for the toast
   * @returns The unique ID of the prepared toast
   */
  prepare: (options: ToastPrepareOptions) => string;
  /**
   * Show a prepared toast
   * @param id - The ID of the toast to show
   */
  show: (id: string) => void;
  /**
   * Hide a visible toast
   * @param id - The ID of the toast to hide
   */
  hide: (id: string) => void;
  /**
   * Remove a toast from memory
   * @param id - The ID of the toast to remove
   */
  remove: (id: string) => void;
}
