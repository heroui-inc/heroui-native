import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/hooks';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/utils/animation';
import {
  DEFAULT_SLOT_CARET_HEIGHT,
  DEFAULT_SLOT_CARET_HEIGHT_DURATION,
  DEFAULT_SLOT_CARET_OPACITY,
  DEFAULT_SLOT_CARET_OPACITY_DURATION,
} from './input-otp.constants';
import type { InputOTPSlotCaretAnimation } from './input-otp.types';

/**
 * Animation hook for InputOTP root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useInputOTPRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for InputOTP.SlotCaret component
 * Handles opacity and height animations for the caret indicator
 */
export function useInputOTPSlotCaretAnimation(options: {
  animation: InputOTPSlotCaretAnimation | undefined;
}) {
  const { animation } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Opacity animation configuration
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: DEFAULT_SLOT_CARET_OPACITY,
  });

  const opacityDuration = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'duration',
    defaultValue: DEFAULT_SLOT_CARET_OPACITY_DURATION,
  });

  // Height animation configuration
  const heightValue = getAnimationValueProperty({
    animationValue: animationConfig?.height,
    property: 'value',
    defaultValue: DEFAULT_SLOT_CARET_HEIGHT,
  });

  const heightDuration = getAnimationValueProperty({
    animationValue: animationConfig?.height,
    property: 'duration',
    defaultValue: DEFAULT_SLOT_CARET_HEIGHT_DURATION,
  });

  const opacity = useSharedValue(opacityValue[1]);
  const height = useSharedValue(heightValue[1]);

  useEffect(() => {
    if (isAnimationDisabledValue) {
      opacity.set(opacityValue[1]);
      height.set(heightValue[1]);
      return;
    }

    opacity.set(
      withRepeat(
        withSequence(
          withTiming(opacityValue[0], { duration: opacityDuration }),
          withTiming(opacityValue[1], { duration: opacityDuration })
        ),
        -1,
        true
      )
    );

    height.set(
      withRepeat(
        withSequence(
          withTiming(heightValue[0], { duration: heightDuration }),
          withTiming(heightValue[1], { duration: heightDuration })
        ),
        -1,
        true
      )
    );
  }, [
    isAnimationDisabledValue,
    opacity,
    height,
    opacityValue,
    opacityDuration,
    heightValue,
    heightDuration,
  ]);

  const rContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.get(),
    height: height.get(),
  }));

  return {
    rContainerStyle,
  };
}
