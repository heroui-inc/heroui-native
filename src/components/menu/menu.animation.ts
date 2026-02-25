import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { colorKit } from '../../helpers/external/utils';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import {
  createContext,
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils';
import type {
  MenuAnimationContextValue,
  MenuItemAnimation,
  MenuItemVariant,
} from './menu.types';

const [MenuAnimationProvider, useMenuAnimation] =
  createContext<MenuAnimationContextValue>({
    name: 'MenuAnimationContext',
  });

// --------------------------------------------------

function useMenuItemAnimation(options: {
  animation: MenuItemAnimation | undefined;
  variant: MenuItemVariant;
}) {
  const { animation, variant } = options;

  const themeColorDefault = useThemeColor('default');
  const themeColorDanger = useThemeColor('danger-soft');

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const isPressed = useSharedValue(false);

  const animationOnPressIn = useCallback(() => {
    isPressed.set(true);
  }, [isPressed]);

  const animationOnPressOut = useCallback(() => {
    isPressed.set(false);
  }, [isPressed]);

  // -- Scale --
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: 0.98,
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 150 },
  });

  // -- Background color --
  const bgColorValue = getAnimationValueProperty({
    animationValue: animationConfig?.backgroundColor,
    property: 'value',
    defaultValue:
      variant === 'danger'
        ? colorKit.setAlpha(themeColorDanger, 0.1).hex()
        : themeColorDefault,
  });

  const bgTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.backgroundColor,
    property: 'timingConfig',
    defaultValue: { duration: 150 },
  });

  const bgColorTransparent = colorKit.setAlpha(themeColorDefault, 0).hex();

  const rItemStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [{ scale: 1 }],
      };
    }

    const pressed = isPressed.get();

    return {
      backgroundColor: withTiming(
        pressed ? bgColorValue : bgColorTransparent,
        bgTimingConfig
      ),
      transform: [
        {
          scale: withTiming(pressed ? scaleValue : 1, scaleTimingConfig),
        },
      ],
    };
  });

  return {
    rItemStyle,
    isPressed,
    animationOnPressIn,
    animationOnPressOut,
  };
}

// --------------------------------------------------

export { MenuAnimationProvider, useMenuAnimation, useMenuItemAnimation };
