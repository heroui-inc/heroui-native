import { useEffect, useMemo } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import {
  cancelAnimation,
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import { useThemeColor } from '../../helpers/external/hooks';
import { colorKit } from '../../helpers/external/utils';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import {
  createContext,
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
import {
  DEFAULT_EASING,
  DEFAULT_PULSE_DURATION,
  DEFAULT_PULSE_MAX_OPACITY,
  DEFAULT_PULSE_MIN_OPACITY,
  DEFAULT_SHIMMER_DURATION,
  DEFAULT_SPEED,
} from './skeleton.constants';
import type {
  SkeletonAnimation,
  SkeletonAnimationContextValue,
  SkeletonRootAnimation,
} from './skeleton.types';

const [SkeletonAnimationProvider, useSkeletonAnimation] =
  createContext<SkeletonAnimationContextValue>({
    name: 'SkeletonAnimationContext',
  });

export { SkeletonAnimationProvider, useSkeletonAnimation };

// --------------------------------------------------

/**
 * Animation hook for Skeleton root component
 * Handles entering/exiting animations, cascades animation disabled state, and manages progress animation
 */
export function useSkeletonRootAnimation(options: {
  animation: SkeletonRootAnimation | undefined;
  isLoading: boolean;
  variant: SkeletonAnimation;
  progress: SharedValue<number>;
}) {
  const { animation, isLoading, variant, progress } = options;

  const { isAnimationDisabled: isAnimationDisabledFromRoot } =
    getRootAnimationState(animation);
  const isAllAnimationsDisabledFromRoot =
    useCombinedAnimationDisabledState(animation);
  const isAllAnimationsDisabled =
    isAllAnimationsDisabledFromRoot || isAnimationDisabledFromRoot;

  const enteringAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.entering : undefined;
  }, [animation]);

  const exitingAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.exiting : undefined;
  }, [animation]);

  const shimmerAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.shimmer : undefined;
  }, [animation]);

  const pulseAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.pulse : undefined;
  }, [animation]);

  const {
    animationConfig: enteringAnimationConfig,
    isAnimationDisabled: isEnteringAnimationDisabled,
  } = getAnimationState(enteringAnimation);

  const {
    animationConfig: exitingAnimationConfig,
    isAnimationDisabled: isExitingAnimationDisabled,
  } = getAnimationState(exitingAnimation);

  const { animationConfig: shimmerAnimationConfig } =
    getAnimationState(shimmerAnimation);

  const { animationConfig: pulseAnimationConfig } =
    getAnimationState(pulseAnimation);

  const isEnteringAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled: isEnteringAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const isExitingAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled: isExitingAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const enteringValue = getAnimationValueProperty({
    animationValue: enteringAnimationConfig,
    property: 'value',
    defaultValue: FadeIn,
  });

  const exitingValue = getAnimationValueProperty({
    animationValue: exitingAnimationConfig,
    property: 'value',
    defaultValue: FadeOut,
  });

  // Extract shimmer animation configuration for progress animation
  const shimmerDuration = getAnimationValueProperty({
    animationValue: shimmerAnimationConfig,
    property: 'duration',
    defaultValue: DEFAULT_SHIMMER_DURATION,
  });

  const shimmerSpeed = getAnimationValueProperty({
    animationValue: shimmerAnimationConfig,
    property: 'speed',
    defaultValue: DEFAULT_SPEED,
  });

  const shimmerEasing = getAnimationValueProperty({
    animationValue: shimmerAnimationConfig,
    property: 'easing',
    defaultValue: DEFAULT_EASING,
  });

  // Extract pulse animation configuration for progress animation
  const pulseDuration = getAnimationValueProperty({
    animationValue: pulseAnimationConfig,
    property: 'duration',
    defaultValue: DEFAULT_PULSE_DURATION,
  });

  const pulseEasing = getAnimationValueProperty({
    animationValue: pulseAnimationConfig,
    property: 'easing',
    defaultValue: Easing.inOut(Easing.ease),
  });

  // Handle progress animation
  useEffect(() => {
    if (isLoading && variant !== 'none' && !isAllAnimationsDisabled) {
      progress.set(0);

      if (variant === 'shimmer') {
        progress.value = withRepeat(
          withTiming(1, {
            duration: shimmerDuration / shimmerSpeed,
            easing: shimmerEasing,
          }),
          -1,
          false,
          undefined,
          ReduceMotion.System
        );
      } else if (variant === 'pulse') {
        progress.value = withRepeat(
          withTiming(1, {
            duration: pulseDuration,
            easing: pulseEasing,
          }),
          -1,
          true,
          undefined,
          ReduceMotion.System
        );
      }
    } else {
      cancelAnimation(progress);
      progress.set(0);
    }

    return () => {
      cancelAnimation(progress);
    };
  }, [
    isLoading,
    variant,
    progress,
    shimmerDuration,
    shimmerEasing,
    shimmerSpeed,
    pulseDuration,
    pulseEasing,
    isAllAnimationsDisabled,
  ]);

  return {
    isAllAnimationsDisabled,
    entering: isEnteringAnimationDisabledValue ? undefined : enteringValue,
    exiting: isExitingAnimationDisabledValue ? undefined : exitingValue,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Skeleton shimmer component
 * Handles shimmer animation configuration and animated styles
 */
export function useSkeletonShimmerAnimation(options: {
  animation: SkeletonRootAnimation | undefined;
}) {
  const { animation } = options;

  const { componentWidth, offset, progress, screenWidth } =
    useSkeletonAnimation();

  const { theme } = useUniwind();
  const themeColorBackground = useThemeColor('background');

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const shimmerAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.shimmer : undefined;
  }, [animation]);

  const { animationConfig, isAnimationDisabled } =
    getAnimationState(shimmerAnimation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Calculate default highlight color based on theme
  const defaultHighlightColor = useMemo(() => {
    return theme === 'dark'
      ? colorKit
          .setAlpha(
            colorKit.increaseBrightness(themeColorBackground, 10).hex(),
            0.1
          )
          .hex()
      : colorKit
          .setAlpha(
            colorKit.decreaseBrightness(themeColorBackground, 10).hex(),
            0.75
          )
          .hex();
  }, [theme, themeColorBackground]);

  const shimmerHighlightColor =
    animationConfig?.highlightColor ?? defaultHighlightColor;

  const gradientColors = useMemo(
    () => ['transparent', shimmerHighlightColor, 'transparent'],
    [shimmerHighlightColor]
  );

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue || componentWidth === 0) {
      return {
        transform: [{ translateX: 0 }],
      };
    }

    const translateX = interpolate(
      progress.get(),
      [0, 1],
      [-(componentWidth + offset), screenWidth]
    );

    return {
      transform: [{ translateX }],
    };
  });

  return {
    rContainerStyle,
    gradientColors,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Skeleton pulse component
 * Handles pulse animation configuration and animated styles
 */
export function useSkeletonPulseAnimation(options: {
  animation: SkeletonRootAnimation | undefined;
}) {
  const { animation } = options;

  const { variant, progress } = useSkeletonAnimation();

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const pulseAnimation = useMemo(() => {
    return typeof animation === 'object' ? animation?.pulse : undefined;
  }, [animation]);

  const { animationConfig, isAnimationDisabled } =
    getAnimationState(pulseAnimation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Pulse animation configuration
  const pulseMinOpacity = getAnimationValueProperty({
    animationValue: animationConfig,
    property: 'minOpacity',
    defaultValue: DEFAULT_PULSE_MIN_OPACITY,
  });

  const pulseMaxOpacity = getAnimationValueProperty({
    animationValue: animationConfig,
    property: 'maxOpacity',
    defaultValue: DEFAULT_PULSE_MAX_OPACITY,
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue || variant !== 'pulse') {
      return {
        opacity: 1,
      };
    }

    const opacity = interpolate(
      progress.get(),
      [0, 1],
      [pulseMinOpacity, pulseMaxOpacity]
    );

    return {
      opacity,
    };
  });

  return {
    rContainerStyle,
  };
}
