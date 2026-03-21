import { useEffect, useMemo } from 'react';
import {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
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

  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

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
  isLoading: boolean;
}) {
  const { animation, isLoading } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Rotation animation configuration
  const rotationSpeed = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'speed',
    defaultValue: 1.1,
  });

  const rotationEasing = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'easing',
    defaultValue: Easing.linear,
  });

  const rotationTimingConfig = useMemo(() => {
    return {
      duration: DEFAULT_ROTATION_DURATION / rotationSpeed,
      easing: rotationEasing,
    };
  }, [rotationSpeed, rotationEasing]);

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

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.get()}deg`,
        },
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
