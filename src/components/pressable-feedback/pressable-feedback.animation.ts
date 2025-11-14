import { Gesture } from 'react-native-gesture-handler';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import { colorKit, useThemeColor } from '../../helpers/theme';
import { createContext } from '../../helpers/utils';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
} from '../../helpers/utils/animation';
import type {
  PressableFeedbackAnimationContextValue,
  PressableFeedbackHighlightAnimation,
} from './pressable-feedback.types';

const [PressableFeedbackAnimationProvider, usePressableFeedbackAnimation] =
  createContext<PressableFeedbackAnimationContextValue>({
    name: 'PressableFeedbackAnimationContext',
  });

export { PressableFeedbackAnimationProvider, usePressableFeedbackAnimation };

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback root component
 * Handles ripple gesture and shared values
 */
export function usePressableFeedbackRootAnimation() {
  const isPressed = useSharedValue(false);
  const pressedCenterX = useSharedValue(0);
  const pressedCenterY = useSharedValue(0);
  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);
  const rippleProgress = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      rippleProgress.set(0);
      pressedCenterX.set(event.x);
      pressedCenterY.set(event.y);
      isPressed.set(true);
      if (rippleProgress.get() === 0) {
        rippleProgress.set(withTiming(1, { duration: 250 }));
      }
    })
    .onFinalize(() => {
      isPressed.set(false);
      rippleProgress.set(withTiming(2, { duration: 400 }));
    });

  return {
    isPressed,
    pressedCenterX,
    pressedCenterY,
    containerWidth,
    containerHeight,
    rippleProgress,
    gesture,
  };
}

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback highlight overlay
 * Handles opacity and background color animations for the highlight effect
 */
export function usePressableFeedbackHighlightAnimation(options: {
  animation: PressableFeedbackHighlightAnimation | undefined;
}) {
  const { animation } = options;

  const { theme } = useUniwind();
  const themeColorBackground = useThemeColor('background');

  const { isPressed } = usePressableFeedbackAnimation();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 0.1] as [number, number],
  });

  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 200, easing: Easing.inOut(Easing.quad) },
  });

  // Background color
  const defaultColor =
    theme === 'dark'
      ? colorKit.brighten(themeColorBackground, 0.05).hex()
      : colorKit.darken(themeColorBackground, 0.05).hex();

  const backgroundColor = getAnimationValueProperty({
    animationValue: animationConfig?.backgroundColor,
    property: 'value',
    defaultValue: defaultColor,
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabled) {
      return {
        backgroundColor,
        opacity: isPressed.get() ? opacityValue[1] : opacityValue[0],
      };
    }

    return {
      backgroundColor,
      opacity: withTiming(
        isPressed.get() ? opacityValue[1] : opacityValue[0],
        opacityTimingConfig
      ),
    };
  });

  return {
    rContainerStyle,
    isPressed,
  };
}

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback ripple effect
 * Handles ripple circle animation with radial gradient
 */
export function usePressableFeedbackRippleAnimation() {
  const {
    pressedCenterX,
    pressedCenterY,
    containerWidth,
    containerHeight,
    rippleProgress,
  } = usePressableFeedbackAnimation();

  const rContainerStyle = useAnimatedStyle(() => {
    const circleRadius =
      Math.sqrt(containerWidth.get() ** 2 + containerHeight.get() ** 2) * 1.25;

    const translateX = pressedCenterX.get() - circleRadius;
    const translateY = pressedCenterY.get() - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: withTiming(
        interpolate(rippleProgress.get(), [0, 1, 2], [0, 1, 0]),
        { duration: 40 }
      ),
      transform: [
        {
          translateX,
        },
        {
          translateY,
        },
        {
          scale: withTiming(
            interpolate(rippleProgress.get(), [0, 1, 2], [0, 1, 1]),
            { duration: 40 }
          ),
        },
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
