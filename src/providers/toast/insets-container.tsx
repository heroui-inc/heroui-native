import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ToastInsets } from './types';

interface InsetsContainerProps {
  /**
   * Optional inset values for all edges
   * If not provided, defaults to platform-specific values:
   * - iOS: safe area insets + 0px (top/bottom), + 12px (left/right)
   * - Android: safe area insets + 12px (all edges)
   */
  insets?: ToastInsets;
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
 *   - iOS: safe area inset + 0px for top/bottom, + 12px for left/right
 *   - Android: safe area inset + 12px for all edges
 */
export function InsetsContainer({ insets, children }: InsetsContainerProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const finalInsets = useMemo(() => {
    return {
      top: insets?.top ?? safeAreaInsets.top + (Platform.OS === 'ios' ? 0 : 12),
      bottom:
        insets?.bottom ??
        safeAreaInsets.bottom + (Platform.OS === 'ios' ? 0 : 12),
      left: insets?.left ?? safeAreaInsets.left + 12,
      right: insets?.right ?? safeAreaInsets.right + 12,
    };
  }, [safeAreaInsets, insets]);

  return (
    <View
      className="absolute inset-0 pointer-events-box-none"
      style={{
        paddingTop: finalInsets.top,
        paddingBottom: finalInsets.bottom,
        paddingLeft: finalInsets.left,
        paddingRight: finalInsets.right,
      }}
    >
      {children}
    </View>
  );
}
