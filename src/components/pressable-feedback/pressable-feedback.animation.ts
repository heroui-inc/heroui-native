import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import { createContext } from '../../helpers/utils';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getStyleTransform,
} from '../../helpers/utils/animation';
import {
  BASE_RIPPLE_PROGRESS_DURATION,
  BASE_RIPPLE_PROGRESS_DURATION_MIN,
} from './pressable-feedback.constants';
import type {
  PressableFeedbackAnimation,
  PressableFeedbackAnimationContextValue,
  PressableFeedbackHighlightRootAnimation,
  PressableFeedbackRippleRootAnimation,
  PressableFeedbackVariant,
} from './pressable-feedback.types';

const [PressableFeedbackAnimationProvider, usePressableFeedbackAnimation] =
  createContext<PressableFeedbackAnimationContextValue>({
    name: 'PressableFeedbackAnimationContext',
  });

export { PressableFeedbackAnimationProvider, usePressableFeedbackAnimation };

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback root component
 * Handles gesture, shared values, and scale animation
 */
export function usePressableFeedbackRootAnimation(options: {
  variant: PressableFeedbackVariant;
  animation: PressableFeedbackAnimation | undefined;
  style: ViewStyle | undefined;
}) {
  const { variant, animation, style } = options;

  const scaleAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.scale : undefined;
  }, [animation]);

  const rippleAnimation = useMemo(() => {
    const animationWithRipple = animation as
      | PressableFeedbackRippleRootAnimation
      | undefined;

    return variant === 'ripple' && typeof animationWithRipple === 'object'
      ? animationWithRipple?.ripple
      : undefined;
  }, [animation, variant]);

  const { isAnimationDisabled: isAllAnimationsDisabled } =
    getAnimationState(animation);

  const {
    animationConfig: scaleAnimationConfig,
    isAnimationDisabled: isScaleAnimationDisabled,
  } = getAnimationState(scaleAnimation);

  const { animationConfig: rippleAnimationConfig } =
    getAnimationState(rippleAnimation);

  const isAnimationDisabledValue =
    isAllAnimationsDisabled || isScaleAnimationDisabled;

  // Scale animation values
  const scaleValue = getAnimationValueProperty({
    animationValue: scaleAnimationConfig,
    property: 'value',
    defaultValue: 0.985,
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: scaleAnimationConfig,
    property: 'timingConfig',
    defaultValue: { duration: 300, easing: Easing.out(Easing.ease) },
  });

  const ignoreScaleCoefficient = getAnimationValueProperty({
    animationValue: scaleAnimationConfig,
    property: 'ignoreScaleCoefficient',
    defaultValue: false,
  });

  // Ripple progress animation values
  const rippleProgressBaseDuration = getAnimationValueProperty({
    animationValue: rippleAnimationConfig?.progress,
    property: 'baseDuration',
    defaultValue: BASE_RIPPLE_PROGRESS_DURATION,
  });

  const ignoreDurationCoefficient = getAnimationValueProperty({
    animationValue: rippleAnimationConfig?.progress,
    property: 'ignoreDurationCoefficient',
    defaultValue: false,
  });

  const rippleProgressMinBaseDuration = getAnimationValueProperty({
    animationValue: rippleAnimationConfig?.progress,
    property: 'minBaseDuration',
    defaultValue: BASE_RIPPLE_PROGRESS_DURATION_MIN,
  });

  // Shared values
  const isPressed = useSharedValue(false);
  const scale = useSharedValue(0);
  const pressedCenterX = useSharedValue(0);
  const pressedCenterY = useSharedValue(0);
  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);
  const rippleProgress = useSharedValue(0);

  // Calculate duration coefficient based on diagonal to maintain consistent ripple speed
  // across different container sizes. Base diagonal is 450px.
  // Can be disabled by setting ignoreDurationCoefficient to true.
  const durationCoefficient = useDerivedValue(() => {
    if (ignoreDurationCoefficient) return 1;

    const baseDiagonal = 450;
    const currentDiagonal = Math.sqrt(
      containerWidth.get() ** 2 + containerHeight.get() ** 2
    );
    return currentDiagonal > 0 ? currentDiagonal / baseDiagonal : 1;
  });

  // Gesture handling
  const gesture = Gesture.Tap()
    .maxDuration(30000)
    .onBegin((event) => {
      isPressed.set(true);
      scale.set(withTiming(1, scaleTimingConfig));

      if (variant === 'highlight') return;

      rippleProgress.set(0);
      pressedCenterX.set(event.x);
      pressedCenterY.set(event.y);
      if (rippleProgress.get() === 0) {
        const adjustedDuration = Math.min(
          Math.max(
            rippleProgressBaseDuration * durationCoefficient.get(),
            rippleProgressMinBaseDuration
          ),
          rippleProgressBaseDuration * 2
        );
        rippleProgress.set(withTiming(1, { duration: adjustedDuration }));
      }
    })
    .onFinalize(() => {
      isPressed.set(false);
      scale.set(withTiming(0, scaleTimingConfig));
      if (variant === 'highlight') return;
      const adjustedDuration = Math.min(
        Math.max(
          rippleProgressBaseDuration * durationCoefficient.get(),
          rippleProgressMinBaseDuration
        ),
        rippleProgressBaseDuration * 2
      );
      rippleProgress.set(withTiming(2, { duration: adjustedDuration }));
    });

  const styleTransform = getStyleTransform(style);

  const adjustedScaleValue = useDerivedValue(() => {
    // Calculate scale coefficient to maintain consistent scale effect across different sizes
    // Can be disabled by setting ignoreScaleCoefficient to true
    const coefficient = ignoreScaleCoefficient
      ? 1
      : containerWidth.get() > 0
        ? 300 / containerWidth.get()
        : 1;
    return 1 - (1 - scaleValue) * coefficient;
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [
          {
            scale: 1,
          },
          ...styleTransform,
        ],
      };
    }

    return {
      transform: [
        {
          scale: interpolate(
            scale.get(),
            [0, 1],
            [1, adjustedScaleValue.get()]
          ),
        },
        ...styleTransform,
      ],
    };
  });

  return {
    isPressed,
    pressedCenterX,
    pressedCenterY,
    containerWidth,
    containerHeight,
    rippleProgress,
    gesture,
    rContainerStyle,
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback highlight overlay
 * Handles opacity and background color animations for the highlight effect
 */
export function usePressableFeedbackHighlightAnimation(options: {
  animation: PressableFeedbackHighlightRootAnimation | undefined;
}) {
  const { animation } = options;

  const { theme } = useUniwind();

  const { isPressed, isAllAnimationsDisabled } =
    usePressableFeedbackAnimation();

  const highlightAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.highlight : undefined;
  }, [animation]);

  const { animationConfig, isAnimationDisabled } =
    getAnimationState(highlightAnimation);

  const isAnimationDisabledValue =
    isAllAnimationsDisabled || isAnimationDisabled;

  // Background color
  const defaultColor = theme === 'dark' ? '#d4d4d8' : '#3f3f46';

  const backgroundColor = getAnimationValueProperty({
    animationValue: animationConfig?.backgroundColor,
    property: 'value',
    defaultValue: defaultColor,
  });

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 0.1] as [number, number],
  });

  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 200 },
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {};
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
export function usePressableFeedbackRippleAnimation(options: {
  animation: PressableFeedbackRippleRootAnimation | undefined;
}) {
  const { animation } = options;

  const { theme } = useUniwind();

  const {
    pressedCenterX,
    pressedCenterY,
    containerWidth,
    containerHeight,
    rippleProgress,
    isAllAnimationsDisabled,
  } = usePressableFeedbackAnimation();

  const rippleAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.ripple : undefined;
  }, [animation]);

  const { animationConfig, isAnimationDisabled } =
    getAnimationState(rippleAnimation);

  const isAnimationDisabledValue =
    isAllAnimationsDisabled || isAnimationDisabled;

  // Background color
  const defaultColor = theme === 'dark' ? '#d4d4d8' : '#3f3f46';

  const backgroundColor = getAnimationValueProperty({
    animationValue: animationConfig?.backgroundColor,
    property: 'value',
    defaultValue: defaultColor,
  });

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 0.1, 0] as [number, number, number],
  });

  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 30 },
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [0, 1, 1] as [number, number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 30 },
  });

  const rContainerStyle = useAnimatedStyle(() => {
    const circleRadius =
      Math.sqrt(containerWidth.get() ** 2 + containerHeight.get() ** 2) * 1.25;

    const translateX = pressedCenterX.get() - circleRadius;
    const translateY = pressedCenterY.get() - circleRadius;

    if (isAnimationDisabledValue) {
      return {};
    }

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: withTiming(
        interpolate(
          rippleProgress.get(),
          [0, 1, 2],
          [opacityValue[0], opacityValue[1], opacityValue[2]]
        ),
        opacityTimingConfig
      ),
      transform: [
        { translateX },
        { translateY },
        {
          scale: withTiming(
            interpolate(
              rippleProgress.get(),
              [0, 1, 2],
              [scaleValue[0], scaleValue[1], scaleValue[2]]
            ),
            scaleTimingConfig
          ),
        },
      ],
    };
  });

  return {
    rContainerStyle,
    backgroundColor,
  };
}
