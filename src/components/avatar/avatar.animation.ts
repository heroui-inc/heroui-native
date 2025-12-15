import type { ImageStyle } from 'react-native';
import {
  Easing,
  FadeIn,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import { useCombinedAnimationDisabledState } from '../../helpers/hooks';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getStyleProperties,
} from '../../helpers/utils/animation';
import * as AvatarPrimitives from '../../primitives/avatar';
import type {
  AvatarFallbackAnimation,
  AvatarImageAnimation,
} from './avatar.types';

/**
 * Animation hook for Avatar root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useAvatarRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}

/**
 * Animation hook for Avatar Image component
 * Handles opacity animation for the avatar image based on loading status
 */
export function useAvatarImageAnimation(options: {
  animation: AvatarImageAnimation | undefined;
  style: ImageStyle | undefined;
}) {
  const { animation, style } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { status } = AvatarPrimitives.useRootContext();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1] as [number, number],
  });
  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 200, easing: Easing.in(Easing.ease) },
  });

  const styleProps = getStyleProperties(style, ['opacity']);

  const rImageStyle = useAnimatedStyle(() => {
    const isLoaded = status === 'loaded';
    const targetOpacity = isLoaded ? opacityValue[1] : opacityValue[0];

    if (isAnimationDisabledValue) {
      return {
        opacity: targetOpacity,
        ...styleProps,
      };
    }

    return {
      opacity: withTiming(targetOpacity, opacityTimingConfig),
      ...styleProps,
    };
  });

  return {
    rImageStyle,
  };
}

/**
 * Animation hook for Avatar Fallback component
 * Handles entering animation for the avatar fallback
 */
export function useAvatarFallbackAnimation(options: {
  animation: AvatarFallbackAnimation | undefined;
  delayMs?: number;
}) {
  const { animation, delayMs } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: FadeIn.duration(200)
      .easing(Easing.in(Easing.ease))
      .delay(delayMs ?? 0),
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
  };
}
