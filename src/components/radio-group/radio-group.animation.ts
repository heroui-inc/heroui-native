import type { ViewStyle } from 'react-native';
import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/hooks';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getStyleTransform,
} from '../../helpers/utils/animation';
import type { RadioGroupIndicatorThumbAnimation } from './radio-group.types';

// --------------------------------------------------

/**
 * Animation hook for RadioGroup root component
 * Handles cascading animation disabled state to child components
 */
export function useRadioGroupRootAnimation(options: {
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
 * Animation hook for RadioGroupIndicatorThumb component
 * Handles scale animation based on selection state
 */
export function useRadioGroupIndicatorThumbAnimation(options: {
  animation: RadioGroupIndicatorThumbAnimation | undefined;
  isSelected: boolean;
  style: ViewStyle | undefined;
}) {
  const { animation, isSelected, style } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1.5, 1] as [number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 300, easing: Easing.out(Easing.ease) },
  });

  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [
          {
            scale: scaleValue[1],
          },
          ...styleTransform,
        ],
      };
    }

    return {
      transform: [
        {
          scale: withTiming(
            isSelected ? scaleValue[1] : scaleValue[0],
            scaleTimingConfig
          ),
        },
        ...styleTransform,
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
