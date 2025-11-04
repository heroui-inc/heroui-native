import { forwardRef } from 'react';
import { Platform, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import * as Slot from '../../primitives/slot';
import {
  ANDROID_ELEVATION_MAP,
  DEFAULT_SHADOW_COLORS,
  DISPLAY_NAME,
  IOS_SHADOW_MAP,
} from './drop-shadow-view.constants';
import dropShadowViewStyles from './drop-shadow-view.styles';
import type { DropShadowViewProps } from './drop-shadow-view.types';

// --------------------------------------------------

const DropShadowViewRoot = forwardRef<View, DropShadowViewProps>(
  (props, ref) => {
    const {
      children,
      asChild,
      className,
      style,
      shadowSize = 'md',
      shadowColor,
      iosShadowStyle,
      androidShadowStyle,
      ...restProps
    } = props;

    const { theme } = useUniwind();
    const tvStyles = dropShadowViewStyles({
      className,
      asChild: Boolean(asChild),
    });

    const defaultShadowColor =
      theme === 'dark'
        ? DEFAULT_SHADOW_COLORS.DARK
        : DEFAULT_SHADOW_COLORS.LIGHT;

    const currentShadowColor = shadowColor || defaultShadowColor;

    const iosShadowConfig = IOS_SHADOW_MAP[shadowSize];
    const androidElevation = ANDROID_ELEVATION_MAP[shadowSize];

    const Component = asChild
      ? Animated.createAnimatedComponent(Slot.View)
      : Animated.View;

    if (Platform.OS === 'android') {
      const androidShadowStyles = {
        shadowColor: currentShadowColor,
        elevation: androidElevation,
        ...androidShadowStyle,
      };

      return (
        <Component
          ref={ref}
          className={tvStyles}
          style={[androidShadowStyles, style]}
          {...restProps}
        >
          {children}
        </Component>
      );
    }

    const iosShadowStyles = {
      shadowColor: currentShadowColor,
      ...iosShadowConfig,
      ...iosShadowStyle,
    };

    return (
      <Component
        ref={ref}
        className={tvStyles}
        style={[iosShadowStyles, style]}
        {...restProps}
      >
        {children}
      </Component>
    );
  }
);

// --------------------------------------------------

DropShadowViewRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * DropShadowView component
 *
 * @component DropShadowView - Container that wraps children with platform-specific drop shadows.
 * Provides optimized shadow rendering with size presets and automatic theme awareness.
 *
 * Platform behavior:
 * - iOS: Uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * - Android: Uses shadowColor and elevation only
 *
 * IMPORTANT: The component must have a background color set (not transparent) on both platforms for proper shadow rendering.
 *
 * Size presets: 'none', 'xs', 'sm', 'md', 'lg', 'xl'
 * Custom shadows: Use iosShadowStyle or androidShadowStyle props for platform-specific overrides.
 *
 * @see Full documentation: https://heroui.com/components/drop-shadow-view
 */
const DropShadowView = DropShadowViewRoot;

export default DropShadowView;
