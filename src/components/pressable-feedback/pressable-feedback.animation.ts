import { useCallback, useRef } from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import {
  createContext,
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
import {
  BASE_RIPPLE_PROGRESS_DURATION,
  BASE_RIPPLE_PROGRESS_DURATION_MIN,
} from './pressable-feedback.constants';
import type {
  PressableFeedbackHighlightAnimation,
  PressableFeedbackRippleAnimation,
  PressableFeedbackRootAnimation,
  PressableFeedbackRootAnimationContextValue,
  PressableFeedbackScaleAnimation,
} from './pressable-feedback.types';

const [
  PressableFeedbackRootAnimationProvider,
  usePressableFeedbackRootAnimationContext,
] = createContext<PressableFeedbackRootAnimationContextValue>({
  name: 'PressableFeedbackRootAnimationContext',
});

export {
  PressableFeedbackRootAnimationProvider,
  usePressableFeedbackRootAnimationContext,
};

// --------------------------------------------------

/**
 * Shared hook that produces an animated scale style from press state and container width.
 * Reused by both the root's built-in scale and the PressableFeedback.Scale compound part.
 *
 * @param options.isPressed        - Shared value tracking whether the component is pressed
 * @param options.containerWidth   - Shared value tracking the container width (for scale coefficient)
 * @param options.animation        - Scale animation configuration (value, timingConfig, ignoreScaleCoefficient)
 * @param options.isAnimationDisabledValue - Final resolved boolean: true when scale should be disabled
 */
function useScaleAnimatedStyle(options: {
  isPressed: SharedValue<boolean>;
  containerWidth: SharedValue<number>;
  animation?: PressableFeedbackScaleAnimation;
  isAnimationDisabledValue: boolean;
}) {
  const { isPressed, containerWidth, animation, isAnimationDisabledValue } =
    options;

  const { animationConfig } = getAnimationState(animation);

  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig,
    property: 'value',
    defaultValue: 0.985,
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig,
    property: 'timingConfig',
    defaultValue: { duration: 300, easing: Easing.out(Easing.ease) },
  });

  const ignoreScaleCoefficient = getAnimationValueProperty({
    animationValue: animationConfig,
    property: 'ignoreScaleCoefficient',
    defaultValue: false,
  });

  const adjustedScaleValue = useDerivedValue(() => {
    const coefficient = ignoreScaleCoefficient
      ? 1
      : containerWidth.get() > 0
        ? 300 / containerWidth.get()
        : 1;
    return 1 - (1 - scaleValue) * coefficient;
  });

  const rScaleStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [{ scale: 1 }],
      };
    }

    return {
      transform: [
        {
          scale: withTiming(
            isPressed.get() ? adjustedScaleValue.get() : 1,
            scaleTimingConfig
          ),
        },
      ],
    };
  });

  return { rScaleStyle };
}

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback root component.
 * Manages press state and container dimensions for child compound parts.
 * Produces the built-in scale animated style by default.
 * Use `animation.scale` to customize, or `animation={false}` to disable.
 */
export function usePressableFeedbackRootAnimation(options: {
  animation?: PressableFeedbackRootAnimation;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isPressed = useSharedValue(false);
  const containerWidth = useSharedValue(0);
  const containerHeight = useSharedValue(0);

  const animationOnPressIn = useCallback(() => {
    isPressed.set(true);
  }, [isPressed]);

  const animationOnPressOut = useCallback(() => {
    isPressed.set(false);
  }, [isPressed]);

  // Extract root-level config to check for built-in scale
  const { animationConfig: rootConfig, isAnimationDisabled: isRootDisabled } =
    getRootAnimationState(animation);

  const scaleAnimation = rootConfig?.scale;
  const hasRootScale = scaleAnimation !== undefined;

  // Resolve scale-specific disabled state (root disabled OR scale's own disabled OR cascade)
  const { isAnimationDisabled: isScaleOwnDisabled } =
    getAnimationState(scaleAnimation);

  const isScaleDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled: isRootDisabled || isScaleOwnDisabled,
    isAllAnimationsDisabled,
  });

  const { rScaleStyle } = useScaleAnimatedStyle({
    isPressed,
    containerWidth,
    animation: scaleAnimation,
    isAnimationDisabledValue: isScaleDisabledValue,
  });

  return {
    isAllAnimationsDisabled,
    animationOnPressIn,
    animationOnPressOut,
    isPressed,
    containerWidth,
    containerHeight,
    hasRootScale,
    rScaleStyle,
  };
}

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback.Scale compound part.
 * Used when applying scale to a specific child element instead of the root.
 * Reads the root's press state via context and delegates to the shared `useScaleAnimatedStyle` hook.
 */
export function usePressableFeedbackScaleAnimation(options: {
  animation?: PressableFeedbackScaleAnimation;
}) {
  const { animation } = options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { isPressed, containerWidth } =
    usePressableFeedbackRootAnimationContext();

  const { isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const { rScaleStyle } = useScaleAnimatedStyle({
    isPressed,
    containerWidth,
    animation,
    isAnimationDisabledValue,
  });

  return {
    rContainerStyle: rScaleStyle,
  };
}

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback highlight overlay
 * Handles opacity and background color animations for the highlight effect
 */
export function usePressableFeedbackHighlightAnimation(options: {
  animation?: PressableFeedbackHighlightAnimation;
}) {
  const { animation } = options;

  const { theme } = useUniwind();

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { isPressed } = usePressableFeedbackRootAnimationContext();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

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
  };
}

// --------------------------------------------------

/**
 * Worklet that computes the animated style for a single ripple layer.
 * Shared by both layers to avoid duplicating the interpolation logic.
 */
function computeRippleLayerStyle(
  containerW: number,
  containerH: number,
  centerX: number,
  centerY: number,
  progress: number,
  opacityValues: readonly [number, number, number],
  scaleValues: readonly [number, number, number]
) {
  'worklet';
  const circleRadius = Math.sqrt(containerW ** 2 + containerH ** 2) * 1.25;

  const translateX = centerX - circleRadius;
  const translateY = centerY - circleRadius;

  return {
    width: circleRadius * 2,
    height: circleRadius * 2,
    borderRadius: circleRadius,
    opacity: interpolate(
      progress,
      [0, 1, 2],
      [opacityValues[0], opacityValues[1], opacityValues[2]]
    ),
    transform: [
      { translateX },
      { translateY },
      {
        scale: interpolate(
          progress,
          [0, 1, 2],
          [scaleValues[0], scaleValues[1], scaleValues[2]]
        ),
      },
    ],
  };
}

/**
 * Animation hook for PressableFeedback ripple effect.
 * Uses a two-layer alternating buffer so a new press can start on a fresh layer
 * while the previous ripple continues its fade-out, preventing visual blinks on rapid presses.
 */
export function usePressableFeedbackRippleAnimation(options: {
  animation?: PressableFeedbackRippleAnimation;
}) {
  const { animation } = options;

  const { theme } = useUniwind();

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { containerWidth, containerHeight } =
    usePressableFeedbackRootAnimationContext();

  const layer0CenterX = useSharedValue(0);
  const layer0CenterY = useSharedValue(0);
  const layer0Progress = useSharedValue(0);

  const layer1CenterX = useSharedValue(0);
  const layer1CenterY = useSharedValue(0);
  const layer1Progress = useSharedValue(0);

  const activeLayerRef = useRef(0);

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const rippleProgressBaseDuration = getAnimationValueProperty({
    animationValue: animationConfig?.progress,
    property: 'baseDuration',
    defaultValue: BASE_RIPPLE_PROGRESS_DURATION,
  });

  const ignoreDurationCoefficient = getAnimationValueProperty({
    animationValue: animationConfig?.progress,
    property: 'ignoreDurationCoefficient',
    defaultValue: false,
  });

  const rippleProgressMinBaseDuration = getAnimationValueProperty({
    animationValue: animationConfig?.progress,
    property: 'minBaseDuration',
    defaultValue: BASE_RIPPLE_PROGRESS_DURATION_MIN,
  });

  const durationCoefficient = useDerivedValue(() => {
    if (ignoreDurationCoefficient) return 1;

    const baseDiagonal = 450;
    const currentDiagonal = Math.sqrt(
      containerWidth.get() ** 2 + containerHeight.get() ** 2
    );
    return currentDiagonal > 0 ? currentDiagonal / baseDiagonal : 1;
  });

  /** Returns the container-diagonal-adjusted ripple duration */
  const getAdjustedDuration = useCallback(() => {
    return Math.min(
      Math.max(
        rippleProgressBaseDuration * durationCoefficient.get(),
        rippleProgressMinBaseDuration
      ),
      rippleProgressBaseDuration * 2
    );
  }, [
    durationCoefficient,
    rippleProgressBaseDuration,
    rippleProgressMinBaseDuration,
  ]);

  const animationOnTouchStart = useCallback(
    (event: GestureResponderEvent) => {
      const prevLayer = activeLayerRef.current;
      const nextLayer = prevLayer === 0 ? 1 : 0;
      activeLayerRef.current = nextLayer;

      const adjustedDuration = getAdjustedDuration();

      const prevProgress = prevLayer === 0 ? layer0Progress : layer1Progress;
      const prevProgressVal = prevProgress.get();
      if (prevProgressVal > 0 && prevProgressVal < 2) {
        prevProgress.set(withTiming(2, { duration: adjustedDuration }));
      }

      const nextCenterX = nextLayer === 0 ? layer0CenterX : layer1CenterX;
      const nextCenterY = nextLayer === 0 ? layer0CenterY : layer1CenterY;
      const nextProgress = nextLayer === 0 ? layer0Progress : layer1Progress;

      nextCenterX.set(event.nativeEvent.locationX);
      nextCenterY.set(event.nativeEvent.locationY);
      nextProgress.set(0);
      nextProgress.set(withTiming(1, { duration: adjustedDuration }));
    },
    [
      getAdjustedDuration,
      layer0CenterX,
      layer0CenterY,
      layer0Progress,
      layer1CenterX,
      layer1CenterY,
      layer1Progress,
    ]
  );

  const animationOnTouchEnd = useCallback(() => {
    const adjustedDuration = getAdjustedDuration();
    const activeProgress =
      activeLayerRef.current === 0 ? layer0Progress : layer1Progress;
    activeProgress.set(withTiming(2, { duration: adjustedDuration }));
  }, [getAdjustedDuration, layer0Progress, layer1Progress]);

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

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [0, 1, 1] as [number, number, number],
  });

  const rLayer0Style = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {};
    }

    return computeRippleLayerStyle(
      containerWidth.get(),
      containerHeight.get(),
      layer0CenterX.get(),
      layer0CenterY.get(),
      layer0Progress.get(),
      opacityValue,
      scaleValue
    );
  });

  const rLayer1Style = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {};
    }

    return computeRippleLayerStyle(
      containerWidth.get(),
      containerHeight.get(),
      layer1CenterX.get(),
      layer1CenterY.get(),
      layer1Progress.get(),
      opacityValue,
      scaleValue
    );
  });

  return {
    rLayer0Style,
    rLayer1Style,
    backgroundColor,
    animationOnTouchStart,
    animationOnTouchEnd,
  };
}
