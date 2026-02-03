import type { ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import {
  useCombinedAnimationDisabledState,
  useResolvedStyleProperty,
} from '../../helpers/internal/hooks';
import {
  createContext,
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
import { useControlField } from '../control-field/control-field.context';
import {
  DEFAULT_SPRING_CONFIG,
  DEFAULT_THUMB_LEFT,
  DEFAULT_THUMB_WIDTH,
  DEFAULT_TIMING_CONFIG,
} from './switch.constants';
import type {
  SwitchAnimationContextValue,
  SwitchRootAnimation,
  SwitchThumbAnimation,
} from './switch.types';

const [SwitchAnimationProvider, useSwitchAnimation] =
  createContext<SwitchAnimationContextValue>({
    name: 'SwitchAnimationContext',
  });

export { SwitchAnimationProvider, useSwitchAnimation };

// --------------------------------------------------

/**
 * Animation hook for Switch root component
 * Handles scale and background color animations and provides context for child components
 */
export function useSwitchRootAnimation(options: {
  animation: SwitchRootAnimation | undefined;
  isSelected: boolean | undefined;
}) {
  const { animation, isSelected } = options;

  const [themeColorAccent, themeColorDefault] = useThemeColor([
    'accent',
    'default',
  ]);

  const controlFieldContext = useControlField();

  const isSwitchPressed = useSharedValue(false);
  const contentContainerWidth = useSharedValue(0);

  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1, 0.96] as [number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 150 },
  });

  // Background color animation
  const backgroundColorValue = getAnimationValueProperty({
    animationValue: animationConfig?.backgroundColor,
    property: 'value',
    defaultValue: [themeColorDefault, themeColorAccent] as [string, string],
  });

  const backgroundColorTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.backgroundColor,
    property: 'timingConfig',
    defaultValue: DEFAULT_TIMING_CONFIG,
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        backgroundColor: isSelected
          ? backgroundColorValue[1]
          : backgroundColorValue[0],
      };
    }

    const pressed =
      isSwitchPressed.get() || (controlFieldContext?.isPressed.get() ?? false);

    return {
      backgroundColor: withTiming(
        isSelected ? backgroundColorValue[1] : backgroundColorValue[0],
        backgroundColorTimingConfig
      ),
      transform: [
        {
          scale: withTiming(
            pressed ? scaleValue[1] : scaleValue[0],
            scaleTimingConfig
          ),
        },
      ],
    };
  });

  return {
    rContainerStyle,
    isSwitchPressed,
    contentContainerWidth,
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Switch thumb component
 * Handles thumb position (left) and background color animations
 */
export function useSwitchThumbAnimation(options: {
  animation: SwitchThumbAnimation | undefined;
  style: ViewStyle | undefined;
  className: string;
  isSelected: boolean | undefined;
}) {
  const { animation, style, className, isSelected } = options;

  const themeColorAccentForeground = useThemeColor('accent-foreground');

  const [width, left] = useResolvedStyleProperty({
    className,
    style,
    propertyNames: ['width', 'left'] as const,
  });

  const computedWidth = typeof width === 'number' ? width : DEFAULT_THUMB_WIDTH;
  const computedLeft = typeof left === 'number' ? left : DEFAULT_THUMB_LEFT;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { contentContainerWidth } = useSwitchAnimation();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Left position animation
  const leftValue = getAnimationValueProperty({
    animationValue: animationConfig?.left,
    property: 'value',
    defaultValue: computedLeft,
  });

  const leftSpringConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.left,
    property: 'springConfig',
    defaultValue: DEFAULT_SPRING_CONFIG,
  });

  // Background color animation
  const backgroundColorValue = getAnimationValueProperty({
    animationValue: animationConfig?.backgroundColor,
    property: 'value',
    defaultValue: ['white', themeColorAccentForeground] as [string, string],
  });

  const backgroundColorTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.backgroundColor,
    property: 'timingConfig',
    defaultValue: DEFAULT_TIMING_CONFIG,
  });

  const rContainerStyle = useAnimatedStyle(() => {
    const isMounted = contentContainerWidth.get() > 0;

    // This is done to prevent the thumb from moving from the default position to the right
    // when the component is mounted with `isSelected` set to `true`,
    // and the user hasn't touched the switch yet.
    if (!isMounted) {
      if (isSelected) {
        return {
          right: leftValue,
          backgroundColor: backgroundColorValue[1],
        };
      }
      return {
        left: leftValue,
        backgroundColor: backgroundColorValue[0],
      };
    }

    const targetLeft = isSelected
      ? contentContainerWidth.get() - computedWidth - leftValue
      : leftValue;

    if (isAnimationDisabledValue) {
      return {
        left: targetLeft,
        backgroundColor: isSelected
          ? backgroundColorValue[1]
          : backgroundColorValue[0],
      };
    }

    return {
      left: withSpring(targetLeft, leftSpringConfig),
      backgroundColor: withTiming(
        isSelected ? backgroundColorValue[1] : backgroundColorValue[0],
        backgroundColorTimingConfig
      ),
    };
  });

  return {
    rContainerStyle,
  };
}
