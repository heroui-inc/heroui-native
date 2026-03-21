import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FullWindowOverlay } from '../../helpers/internal/components';
import type { ToastInsets } from './types';

interface InsetsContainerProps {
  /**
   * When true, uses a regular View instead of FullWindowOverlay on iOS.
   * Enables element inspector but toasts won't appear above native modals.
   * @default false
   */
  disableFullWindowOverlay: boolean;
  /**
   * Optional inset values for all edges
   * If not provided, defaults to platform-specific values:
   * - iOS: safe area insets + 0px (top), + 6px (bottom), + 12px (left/right)
   * - Android: safe area insets + 12px (all edges)
   */
  insets?: ToastInsets;
  /**
   * Custom wrapper function to wrap the toast content
   * Receives children and should return a component that wraps them
   * The wrapper should apply flex: 1 (via className or style) to ensure proper layout
   * Can be any component wrapper - KeyboardAvoidingView, View, or any custom component
   */
  contentWrapper?: (children: ReactNode) => React.ReactElement;
  /**
   * Children to render inside the container
   */
  children: ReactNode;
}

/**
 * Container component that applies inset padding to position toasts
 * away from screen edges and safe areas
 *
 * Combines custom insets with safe area insets:
 * - If custom inset is provided, it overrides safe area + default padding
 * - If not provided, uses platform-specific defaults:
 *   - iOS: safe area inset + 0px for top, + 6px for bottom, + 12px for left/right
 *   - Android: safe area inset + 12px for all edges
 */
export function InsetsContainer({
  insets,
  contentWrapper,
  children,
  disableFullWindowOverlay,
}: InsetsContainerProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const finalInsets = useMemo(() => {
    return {
      top: insets?.top ?? safeAreaInsets.top + (Platform.OS === 'ios' ? 0 : 12),
      bottom:
        insets?.bottom ??
        safeAreaInsets.bottom + (Platform.OS === 'ios' ? 6 : 12),
      left: insets?.left ?? safeAreaInsets.left + 12,
      right: insets?.right ?? safeAreaInsets.right + 12,
    };
  }, [safeAreaInsets, insets]);

  const content = (
    <View
      className="absolute inset-0 pointer-events-box-none"
      style={{
        paddingTop: finalInsets.top,
        paddingBottom: finalInsets.bottom,
        paddingLeft: finalInsets.left,
        paddingRight: finalInsets.right,
      }}
    >
      {contentWrapper ? contentWrapper(children) : children}
    </View>
  );

  if (Platform.OS !== 'ios') {
    return content;
  }

  return (
    <FullWindowOverlay disableFullWindowOverlay={disableFullWindowOverlay}>
      {content}
    </FullWindowOverlay>
  );
}
