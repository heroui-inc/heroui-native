import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import { FullWindowOverlay as NativeFullWindowOverlay } from 'react-native-screens';

/**
 * Props for the FullWindowOverlay component
 *
 * @description
 * FullWindowOverlay renders content in a separate native window on iOS,
 * which allows overlays (bottom sheets, dialogs, toasts) to appear above
 * native modals and the keyboard. However, this breaks the React Native
 * element inspector because it attaches to the main window.
 *
 * Set `disableFullWindowOverlay={true}` when you need to use the element
 * inspector during development. Note: when disabled, overlay content will
 * not render above native modals. iOS only; has no effect on Android.
 */
export interface FullWindowOverlayProps {
  /**
   * When true, uses a regular View instead of FullWindowOverlay on iOS.
   * Enables element inspector but overlay content won't appear above native modals.
   * @default false
   */
  disableFullWindowOverlay: boolean;
  /**
   * Content to render inside the overlay
   */
  children: ReactNode;
}

/**
 * Wrapper for react-native-screens FullWindowOverlay with optional disable prop.
 *
 * @description
 * On iOS, FullWindowOverlay creates a separate native window for overlay content,
 * which breaks the React Native element inspector. Use `disableFullWindowOverlay`
 * when debugging to render content in the main window instead.
 */
export function FullWindowOverlay({
  disableFullWindowOverlay,
  children,
}: FullWindowOverlayProps) {
  if (Platform.OS !== 'ios' || disableFullWindowOverlay) {
    return <>{children}</>;
  }

  return <NativeFullWindowOverlay>{children}</NativeFullWindowOverlay>;
}
