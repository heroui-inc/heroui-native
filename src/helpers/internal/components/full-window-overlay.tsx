import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import ReactNativeScreensPackage from '../../../optional/react-native-screens';
import TrueSheetPackage from '../../../optional/true-sheet';

const NativeFullWindowOverlay = ReactNativeScreensPackage?.FullWindowOverlay;
const TrueSheetOverlay = TrueSheetPackage?.TrueSheetOverlay;

/**
 * Renders `children` in the native layer above every presented sheet.
 * Dialogs, toasts, menus, popovers, and selects pass through here. When
 * TrueSheet is not installed, `children` render where they already do.
 */
export function AboveNativeSheet({ children }: { children: ReactNode }) {
  if (!TrueSheetOverlay) {
    return <>{children}</>;
  }

  return <TrueSheetOverlay>{children}</TrueSheetOverlay>;
}

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
   * Controls whether VoiceOver treats the overlay window as a modal container.
   * When `false`, VoiceOver can still access elements behind the overlay.
   * When `true`, VoiceOver is restricted to elements inside the overlay.
   * @default false
   * @platform ios
   * @unstable This prop maps directly to the native `accessibilityViewIsModal`
   * on the container view and may change in a future react-native-screens release.
   */
  unstable_accessibilityContainerViewIsModal?: boolean;
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
  unstable_accessibilityContainerViewIsModal = false,
  children,
}: FullWindowOverlayProps) {
  const content = <AboveNativeSheet>{children}</AboveNativeSheet>;

  if (
    Platform.OS !== 'ios' ||
    disableFullWindowOverlay ||
    !NativeFullWindowOverlay
  ) {
    return content;
  }

  return (
    <NativeFullWindowOverlay
      unstable_accessibilityContainerViewIsModal={
        unstable_accessibilityContainerViewIsModal
      }
    >
      {content}
    </NativeFullWindowOverlay>
  );
}
