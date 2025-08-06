import { useTheme } from '@/theme';
import { forwardRef } from 'react';
import { Platform, View } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  ANDROID_ELEVATION_MAP,
  DEFAULT_SHADOW_COLORS,
  DISPLAY_NAME,
  IOS_SHADOW_MAP,
} from './drop-shadow-view.constants';
import dropShadowViewStyles from './drop-shadow-view.styles';
import type { DropShadowViewProps } from './drop-shadow-view.types';

// --------------------------------------------------

/**
 * DropShadowView component provides platform-specific shadow rendering
 *
 * Platform-specific behavior:
 * - iOS: Uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * - Android: Uses shadowColor and elevation only
 *
 * Note: To customize the shadow, use iosShadowStyle or androidShadowStyle props for platform-specific overrides
 *
 * Android limitations: shadowOffset, shadowOpacity, and shadowRadius are ignored on Android.
 * Only elevation and shadowColor work on Android.
 *
 * IMPORTANT: For proper shadow rendering, this view should be the root
 * component and must have a background color set (not transparent).
 */
const DropShadowViewRoot = forwardRef<View, DropShadowViewProps>(
  (props, ref) => {
    const {
      children,
      className,
      style,
      shadowSize = 'md',
      shadowColor,
      iosShadowStyle,
      androidShadowStyle,
      ...restProps
    } = props;

    const { isDark } = useTheme();
    const tvStyles = dropShadowViewStyles({ className });

    const defaultShadowColor = isDark
      ? DEFAULT_SHADOW_COLORS.DARK
      : DEFAULT_SHADOW_COLORS.LIGHT;

    const currentShadowColor = shadowColor || defaultShadowColor;

    const iosShadowConfig = IOS_SHADOW_MAP[shadowSize];
    const androidElevation = ANDROID_ELEVATION_MAP[shadowSize];

    if (Platform.OS === 'android') {
      const androidShadowStyles = {
        shadowColor: currentShadowColor,
        elevation: androidElevation,
        ...androidShadowStyle,
      };

      return (
        <Animated.View
          ref={ref}
          className={tvStyles}
          style={[androidShadowStyles, style]}
          {...restProps}
        >
          {children}
        </Animated.View>
      );
    }

    const iosShadowStyles = {
      shadowColor: currentShadowColor,
      ...iosShadowConfig,
      ...iosShadowStyle,
    };

    return (
      <Animated.View
        ref={ref}
        className={tvStyles}
        style={[iosShadowStyles, style]}
        {...restProps}
      >
        {children}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

DropShadowViewRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * DropShadowView component for adding platform-specific shadows to children
 *
 * @component DropShadowView - Main container that wraps children with a drop shadow.
 * Provides platform-optimized shadow rendering with size presets and theme awareness.
 *
 * Platform differences:
 * - iOS: Uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * - Android: Uses shadowColor and elevation only (requires background color for proper rendering)
 *
 * Size presets: 'none', 'xs', 'sm', 'md', 'lg', 'xl'
 *
 * To customize shadow properties, use iosShadowStyle or androidShadowStyle props for platform-specific overrides.
 *
 * @see Full documentation: https://heroui.com/components/drop-shadow-view
 */
const DropShadowView = DropShadowViewRoot;

export default DropShadowView;
