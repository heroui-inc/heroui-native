import type { ViewStyle } from 'react-native';
import {
  Easing,
  FadeInDown,
  FadeInUp,
  interpolate,
  Keyframe,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getStyleProperties,
  getStyleTransform,
} from '../../helpers/utils/animation';
import type { ToastPlacement, ToastRootAnimation } from './toast.types';

// --------------------------------------------------

export const enteringTop = FadeInUp.springify()
  .withInitialValues({
    opacity: 1,
    transform: [{ translateY: -100 }],
  })
  .mass(3);

export const exitingTop = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }, { scale: 1 }],
  },
  100: {
    opacity: 0.5,
    transform: [{ translateY: -100 }, { scale: 0.97 }],
    easing: Easing.in(Easing.ease),
  },
}).duration(200);

export const enteringBottom = FadeInDown.springify()
  .withInitialValues({
    opacity: 1,
    transform: [{ translateY: 100 }],
  })
  .mass(3);

export const exitingBottom = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }, { scale: 1 }],
  },
  100: {
    opacity: 0.5,
    transform: [{ translateY: 100 }, { scale: 0.97 }],
    easing: Easing.in(Easing.ease),
  },
}).duration(200);

// --------------------------------------------------

/**
 * Animation hook for Toast root component
 * Handles opacity, translateY, and scale animations based on toast index and placement
 */
export function useToastRootAnimation(options: {
  animation: ToastRootAnimation | undefined;
  style: ViewStyle | undefined;
  index: number;
  total: number;
  placement: ToastPlacement;
}) {
  const { animation, style, index, total, placement } = options;

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  // Entering animation
  const enteringTopValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'top',
    defaultValue: enteringTop,
  });

  const enteringBottomValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'bottom',
    defaultValue: enteringBottom,
  });

  // Exiting animation
  const exitingTopValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'top',
    defaultValue: exitingTop,
  });

  const exitingBottomValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'bottom',
    defaultValue: exitingBottom,
  });

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [1, 0] as [number, number],
  });

  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 300 },
  });

  // TranslateY animation
  const translateYValue = getAnimationValueProperty({
    animationValue: animationConfig?.translateY,
    property: 'value',
    defaultValue: [0, 10] as [number, number],
  });

  const translateYTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.translateY,
    property: 'timingConfig',
    defaultValue: { duration: 300 },
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1, 0.97] as [number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 300 },
  });

  // Extract style overrides OUTSIDE useAnimatedStyle
  const styleProps = getStyleProperties(style, ['opacity']);
  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    const sign = placement === 'top' ? 1 : -1;

    const inputRange = [total - 1, total - 2];
    const opacityInputRange = [total - 3, total - 4];

    const opacity = interpolate(index, opacityInputRange, opacityValue);
    const translateY = interpolate(index, inputRange, [
      translateYValue[0],
      translateYValue[1] * sign,
    ]);
    const scale = interpolate(index, inputRange, scaleValue);

    if (isAnimationDisabled) {
      return {
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        opacity,
        transform: [
          {
            translateY,
          },
          {
            scale,
          },
          ...styleTransform,
        ],
        ...styleProps,
      };
    }

    return {
      pointerEvents: opacity === 0 ? 'none' : 'auto',
      opacity: withTiming(opacity, opacityTimingConfig),
      transform: [
        {
          translateY: withTiming(translateY, translateYTimingConfig),
        },
        {
          scale: withTiming(scale, scaleTimingConfig),
        },
        ...styleTransform,
      ],
      ...styleProps,
    };
  });

  // Determine entering and exiting animations based on placement
  const enteringAnimation =
    placement === 'top' ? enteringTopValue : enteringBottomValue;
  const exitingAnimation =
    placement === 'top' ? exitingTopValue : exitingBottomValue;

  return {
    rContainerStyle,
    isAnimationDisabled,
    entering: isAnimationDisabled ? undefined : enteringAnimation,
    exiting: isAnimationDisabled ? undefined : exitingAnimation,
  };
}
