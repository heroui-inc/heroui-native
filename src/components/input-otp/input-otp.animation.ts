import { useEffect } from 'react';
import {
  Easing,
  FadeIn,
  FadeOut,
  FlipInXDown,
  FlipOutXDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils';
import type {
  InputOTPSlotCaretAnimation,
  InputOTPSlotValueAnimation,
} from './input-otp.types';

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
    defaultValue: [0, 1] as [number, number],
  });

  const opacityDuration = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'duration',
    defaultValue: 500,
  });

  // Height animation configuration
  const heightValue = getAnimationValueProperty({
    animationValue: animationConfig?.height,
    property: 'value',
    defaultValue: [16, 18] as [number, number],
  });

  const heightDuration = getAnimationValueProperty({
    animationValue: animationConfig?.height,
    property: 'duration',
    defaultValue: 500,
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

// --------------------------------------------------

/**
 * Animation hook for InputOTP.SlotValue component
 * Handles wrapper (fade) and text (flip) animations for entering/exiting
 */
export function useInputOTPSlotValueAnimation(options: {
  animation: InputOTPSlotValueAnimation | undefined;
}) {
  const { animation } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Wrapper animation configuration (fade)
  const wrapperEntering = getAnimationValueProperty({
    animationValue: animationConfig?.wrapper,
    property: 'entering',
    defaultValue: FadeIn.duration(250),
  });

  const wrapperExiting = getAnimationValueProperty({
    animationValue: animationConfig?.wrapper,
    property: 'exiting',
    defaultValue: FadeOut.duration(100),
  });

  // Text animation configuration (flip)
  const textEntering = getAnimationValueProperty({
    animationValue: animationConfig?.text,
    property: 'entering',
    defaultValue: FlipInXDown.duration(250)
      .delay(0)
      .easing(Easing.bezier(0, 0.75, 0.5, 0.9).factory())
      .build(),
  });

  const textExiting = getAnimationValueProperty({
    animationValue: animationConfig?.text,
    property: 'exiting',
    defaultValue: FlipOutXDown.duration(250)
      .easing(Easing.bezier(0.6, 0.1, 0.4, 0.8).factory())
      .build(),
  });

  return {
    wrapperEntering: isAnimationDisabledValue ? undefined : wrapperEntering,
    wrapperExiting: isAnimationDisabledValue ? undefined : wrapperExiting,
    textEntering: isAnimationDisabledValue ? undefined : textEntering,
    textExiting: isAnimationDisabledValue ? undefined : textExiting,
  };
}
