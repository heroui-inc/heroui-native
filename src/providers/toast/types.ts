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
}

/**
 * Context value for the Toast provider
 */
export interface ToastContextValue {
  // PLACEHOLDER
}
