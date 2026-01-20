import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils';
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
}) {
  const { animation, isSelected } = options;

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

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [
          {
            scale: scaleValue[1],
          },
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
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
