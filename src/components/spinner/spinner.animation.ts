import { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getCombinedAnimationDisabledState,
  getIsAnimationDisabledValue,
  getRootAnimationState,
  getStyleTransform,
} from '../../helpers/utils/animation';
import {
  DEFAULT_ROTATION_DURATION,
  DEFAULT_SPINNER_INDICATOR_ENTERING,
  DEFAULT_SPINNER_INDICATOR_EXITING,
} from './spinner.constants';
import type {
  SpinnerIndicatorAnimation,
  SpinnerRootAnimation,
} from './spinner.types';

// --------------------------------------------------

/**
 * Animation hook for Spinner root component
 * Handles entering and exiting animations for the spinner container
 */
export function useSpinnerRootAnimation(options: {
  animation: SpinnerRootAnimation | undefined;
}) {
  const { animation } = options;

  // Read parent animation disabled state from global context
  const parentAnimationSettingsContext = useAnimationSettings();
  const parentIsAllAnimationsDisabled =
    parentAnimationSettingsContext?.isAllAnimationsDisabled;

  const {
    animationConfig,
    isAnimationDisabled,
    isAllAnimationsDisabled: ownIsAllAnimationsDisabled,
  } = getRootAnimationState(animation);

  // Combine parent and own disable-all states (parent wins)
  const isAllAnimationsDisabled = getCombinedAnimationDisabledState({
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  });

  const isAnimationDisabledValue =
    isAnimationDisabled || isAllAnimationsDisabled;

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: DEFAULT_SPINNER_INDICATOR_ENTERING,
  });

  // Exiting animation
  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: DEFAULT_SPINNER_INDICATOR_EXITING,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Spinner Indicator component
 * Handles rotation animation for the spinner indicator
 */
export function useSpinnerIndicatorAnimation(options: {
  animation: SpinnerIndicatorAnimation | undefined;
  style: ViewStyle | undefined;
  isLoading: boolean;
  speed?: number;
}) {
  const { animation, style, isLoading, speed = 1.1 } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Rotation animation configuration
  const rotationSpeed = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'speed',
    defaultValue: speed,
  });

  const rotationEasing = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'easing',
    defaultValue: Easing.linear,
  });

  const rotationTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.rotation,
    property: 'timingConfig',
    defaultValue: {
      duration: DEFAULT_ROTATION_DURATION / rotationSpeed,
      easing: rotationEasing,
    },
  });

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isLoading) {
      if (isAnimationDisabledValue) {
        rotation.set(0);
      } else {
        rotation.set(
          withRepeat(
            withSequence(withTiming(360, rotationTimingConfig)),
            -1,
            false
          )
        );
      }
    } else {
      rotation.set(withTiming(0, { duration: 300 }));
    }

    return () => {
      cancelAnimation(rotation);
    };
  }, [isLoading, isAnimationDisabledValue, rotation, rotationTimingConfig]);

  // Extract style transform OUTSIDE useAnimatedStyle
  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.get()}deg`,
        },
        ...styleTransform,
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
