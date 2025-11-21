import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ToastInsets } from './types';

interface InsetsContainerProps {
  /**
   * Optional inset values for all edges
   * If not provided, defaults to safe area insets + 12px
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
 * - If not provided, uses safe area inset + 12px default padding
 */
export function InsetsContainer({ insets, children }: InsetsContainerProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const finalInsets = useMemo(() => {
    return {
      top: insets?.top ?? safeAreaInsets.top + 12,
      bottom: insets?.bottom ?? safeAreaInsets.bottom + 12,
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
